import React, { useState } from 'react';
import { PasswordInput } from './PasswordInput';
import { Plus, Trash2, Save } from 'lucide-react';
import { message } from 'antd';

// --- Steedfast Component ---
interface SteedfastProps {
    apiKey: string;
    setApiKey: (val: string) => void;
    apiSecret: string;
    setApiSecret: (val: string) => void;
    user: any;
    fetchSettings: () => void;
}

export const SteedfastSection: React.FC<SteedfastProps> = ({
    apiKey,
    setApiKey,
    apiSecret,
    setApiSecret,
    user,
    fetchSettings,
}) => {
    console.log('apiKey', apiKey);

    const handleCreate = async () => {
        if (!apiKey || !apiSecret) {
            message.warning('Please enter API Key and Secret!');
            return;
        }
        try {
            const payload = { apiKey, apiSecret };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/steedfast/create-steedfast`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();
            if (!data.error) {
                message.success('Steedfast created!');
                fetchSettings();
            } else message.error(data.error);
        } catch {
            message.error('Failed to create Steedfast!');
        }
    };

    const handleSave = async () => {
        try {
            const payload = { apiKey, apiSecret };

            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/steedfast/update-steedfast`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json();
            if (!data.error) {
                message.success('Steedfast updated!');
                fetchSettings();
            } else message.error(data.error);
        } catch {
            message.error('Failed to update Steedfast!');
        }
    };

    const handleRemove = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/steedfast/delete-steedfast`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            setApiKey('');
            setApiSecret('');
            message.success('Steedfast removed!');
        } catch {
            message.error('Failed to remove Steedfast!');
        }
    };

    return (
        <div className="mt-8 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-inner">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Configure Steedfast
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <PasswordInput
                    label="API Key"
                    value={apiKey}
                    onChange={setApiKey}
                />
                <PasswordInput
                    label="API Secret"
                    value={apiSecret}
                    onChange={setApiSecret}
                />
            </div>
            <div className="flex justify-end gap-4">
                {apiKey || apiSecret ? (
                    <>
                        <button
                            onClick={handleRemove}
                            className="flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                        >
                            {' '}
                            <Trash2 className="w-4 h-4 mr-2" /> Remove{' '}
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                        >
                            {' '}
                            <Save className="w-4 h-4 mr-2" /> Update{' '}
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleCreate}
                        className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                    >
                        {' '}
                        <Save className="w-4 h-4 mr-2" /> Save{' '}
                    </button>
                )}
            </div>
        </div>
    );
};
