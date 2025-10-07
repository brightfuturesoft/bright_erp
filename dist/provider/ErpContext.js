import { jsx as _jsx } from 'react/jsx-runtime';
import { createContext, useEffect, useState } from 'react';
export const Erp_context = createContext(undefined);
import CryptoJS from 'crypto-js';
// Must be same as used in Node.js
const SECRET_KEY = 'Bright_ERP';
export function decryptCookie(encryptedStr) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedStr, SECRET_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    } catch (err) {
        console.error('Failed to decrypt cookie:', err);
        return '';
    }
}
const getCookieValue = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};
const Erp_Provider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [workspace, set_workspace] = useState(null);
    const [user_loading, user_setLoading] = useState(true);
    useEffect(() => {
        const user_cookie_value = getCookieValue('erp_user');
        const workspace_cookie_value = getCookieValue('erp_workspace');
        if (user_cookie_value && workspace_cookie_value) {
            const decryptedUser = decryptCookie(user_cookie_value);
            const decryptedWorkspace = decryptCookie(workspace_cookie_value);
            try {
                setUser(JSON.parse(decryptedUser));
                set_workspace(JSON.parse(decryptedWorkspace));
            } catch (err) {
                console.error('Failed to parse decrypted cookie data:', err);
            }
        }
        user_setLoading(false);
    }, []);
    const information = {
        user,
        workspace,
        setUser,
        set_workspace,
        user_loading,
    };
    return _jsx(Erp_context.Provider, {
        value: information,
        children: children,
    });
};
export default Erp_Provider;
