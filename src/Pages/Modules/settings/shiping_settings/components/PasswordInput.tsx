import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    value,
    onChange,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const Icon = showPassword ? EyeOff : Eye;

    return (
        <div className="relative w-full">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={label}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full p-3 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition-colors"
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                <Icon className="w-5 h-5" />
            </button>
        </div>
    );
};
