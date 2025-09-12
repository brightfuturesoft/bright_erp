import { createContext, useEffect, useState, ReactNode } from 'react';

type User = any;
type Workspace = any;

type ErpContextType = {
    user: User;
    workspace: Workspace;
    setUser: (user: User) => void;
    set_workspace: (workspace: Workspace) => void;
    user_loading: boolean;
};

export const Erp_context = createContext<ErpContextType | undefined>(undefined);

type ErpProviderProps = {
    children: ReactNode;
};

import CryptoJS from 'crypto-js';

// Must be same as used in Node.js
const SECRET_KEY = 'Bright_ERP';

export function decryptCookie(encryptedStr: string): string {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    } catch (err) {
        console.error('Failed to decrypt cookie:', err);
        return '';
    }
}

const getCookieValue = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const Erp_Provider = ({ children }) => {
    const [user, setUser] = useState<User>(null);
    const [workspace, set_workspace] = useState<Workspace>(null);
    const [user_loading, user_setLoading] = useState<boolean>(true);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                const storedId = localStorage.getItem('erp_user_id');
                if (!storedId) {
                    user_setLoading(false);
                    return;
                }
                const { getBaseUrl } = await import(
                    '@/helpers/config/envConfig'
                );
                const base = (getBaseUrl as any) || '';
                const res = await fetch(`${base}/auth/me`, {
                    headers: { Authorization: storedId },
                    credentials: 'include',
                });
                const payload = await res.json();
                if (res.ok && payload?.data?.user) {
                    setUser(payload.data.user);
                    set_workspace(payload.data.workspace || null);
                }
            } catch (err) {
                console.error('Failed to load current user:', err);
            } finally {
                user_setLoading(false);
            }
        };
        bootstrap();
    }, []);

    const information: ErpContextType = {
        user,
        workspace,
        setUser,
        set_workspace,
        user_loading,
    };

    return (
        <Erp_context.Provider value={information}>
            {children}
        </Erp_context.Provider>
    );
};

export default Erp_Provider;
