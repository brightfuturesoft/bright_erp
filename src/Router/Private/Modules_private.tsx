import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Erp_context } from '@/provider/ErpContext';
import { useContext } from 'react';
import { getBaseUrl } from '@/helpers/config/envConfig';

type RequirePermissionProps = {
    permission: string;
    element: ReactElement;
};

export const RequirePermission = ({
    permission,
    element,
}: RequirePermissionProps) => {
    const ctx = useContext(Erp_context);
    const location = useLocation();
    const [allowed, setAllowed] = useState<boolean | null>(null);
    const [permissionSet, setPermissionSet] = useState<Set<string> | null>(
        null
    );

    const mapToGroup = (perm: string): string | null => {
        // Accept either group or group:view
        const base = perm.split(':')[0];
        if (base === 'items' || base === 'item') return 'items';
        if (base === 'sales' || base === 'sale') return 'sales';
        if (base === 'ecommerce' || base === 'e-commerce') return 'ecommerce';
        if (base === 'inventory') return 'inventory';
        if (base === 'pos') return 'pos';
        if (base === 'roles' || base === 'settings') return 'settings';
        if (base === 'support') return 'support';
        if (base === 'report') return 'report';
        if (base === 'customer') return 'customer';
        if (base === 'dashboard') return 'dashboard';
        return null;
    };

    useEffect(() => {
        let isMounted = true;
        const loadPermissions = async () => {
            // Avoid decisions while context is still loading
            if (!ctx || (ctx as any).user_loading) {
                if (isMounted) setAllowed(null);
                return;
            }
            if (!ctx?.user) {
                if (isMounted) setAllowed(false);
                return;
            }
            if (permissionSet) return; // already loaded
            try {
                const userId = (ctx.user as any)?._id || (ctx.user as any)?.id;
                if (!userId) {
                    if (isMounted) setPermissionSet(new Set());
                    return;
                }
                const res = await fetch(
                    `${getBaseUrl}/settings/user-role/users-with-roles?user_id=${encodeURIComponent(userId)}`,
                    { credentials: 'include' }
                );
                const data = await res.json();
                const users: any[] = data?.data || [];
                const me = users[0];
                let perms: string[] = [];
                if (
                    me?.role?.permissions &&
                    Array.isArray(me.role.permissions)
                ) {
                    perms = me.role.permissions;
                } else if (
                    me?.role_permissions &&
                    Array.isArray(me.role_permissions)
                ) {
                    perms = me.role_permissions;
                }
                if (isMounted) setPermissionSet(new Set(perms));
            } catch (_e) {
                if (isMounted) setPermissionSet(new Set());
            }
        };
        loadPermissions();
        return () => {
            isMounted = false;
        };
    }, [ctx?.user, (ctx as any)?.user_loading]);

    useEffect(() => {
        if (!permissionSet) return;
        // If no permissions are assigned, allow access by default
        if ((permissionSet.size ?? 0) === 0) {
            setAllowed(true);
            return;
        }
        const group = mapToGroup(permission) || permission.split(':')[0];
        let ok = false;
        const synonyms = new Set<string>(
            [
                group,
                group === 'items' ? 'item' : '',
                group === 'item' ? 'items' : '',
                group === 'sales' ? 'sale' : '',
                group === 'sale' ? 'sales' : '',
                group === 'ecommerce' ? 'e-commerce' : '',
                group === 'e-commerce' ? 'ecommerce' : '',
                `${group}:view`,
                `${group}:*`,
            ].filter(Boolean) as string[]
        );
        for (const g of synonyms) {
            if (permissionSet.has(g)) {
                ok = true;
                break;
            }
        }
        setAllowed(ok);
    }, [permissionSet, permission]);

    // While loading user or permissions, render nothing to avoid flicker/loops
    if (allowed === null) return null;
    // If no roles are set, allow dashboard by default to prevent lockout
    if (
        !allowed &&
        permission === 'dashboard:view' &&
        (permissionSet?.size ?? 0) === 0
    ) {
        return element;
    }
    // Redirect to a safe, unguarded route to avoid redirect loops
    if (!allowed)
        return (
            <Navigate
                to="/"
                state={{ from: location }}
                replace
            />
        );
    return element;
};
