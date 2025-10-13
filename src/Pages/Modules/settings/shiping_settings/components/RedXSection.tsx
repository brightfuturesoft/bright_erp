import { useEffect, useState } from 'react';
import { message } from 'antd';
import { Plus, Save, Trash2 } from 'lucide-react';
import { PasswordInput } from './PasswordInput';

interface RedXProps {
    redxBaseUrl: string;
    setRedxBaseUrl: (val: string) => void;
    redxApiKey: string;
    setRedxApiKey: (val: string) => void;
    redxApiSecret: string;
    setRedxApiSecret: (val: string) => void;
    user: any;
    fetchSettings: () => void;
}

export const RedXSection: React.FC<RedXProps> = ({
    redxBaseUrl,
    setRedxBaseUrl,
    redxApiKey,
    setRedxApiKey,
    redxApiSecret,
    setRedxApiSecret,
    user,
    fetchSettings,
}) => {
    const [hasExistingData, setHasExistingData] = useState(false);

    // ✅ Check existing RedX data on mount
    useEffect(() => {
        const checkExistingData = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}courier/redx/get-redx`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: user._id,
                            workspace_id: user.workspace_id,
                        },
                    }
                );

                const data = await res.json();

                if (!data.error && data.data?.length > 0) {
                    const redx = data.data[0];
                    setRedxBaseUrl(redx.base_url);
                    setRedxApiKey(redx.apiKey);
                    setRedxApiSecret(redx.apiSecret);
                    setHasExistingData(true);
                } else {
                    setHasExistingData(false);
                }
            } catch (err) {
                console.error(err);
                setHasExistingData(false);
            }
        };

        checkExistingData();
    }, [user]);

    // ✅ Create
    const handleCreate = async () => {
        if (!redxBaseUrl || !redxApiKey || !redxApiSecret) {
            message.warning('Please fill all fields!');
            return;
        }
        try {
            const payload = {
                base_url: redxBaseUrl,
                apiKey: redxApiKey,
                apiSecret: redxApiSecret,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/redx/create-redx`,
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
                message.success('RedX created!');
                setHasExistingData(true);
                fetchSettings();
            } else message.error(data.message || 'Failed to create!');
        } catch {
            message.error('Failed to create RedX!');
        }
    };

    // ✅ Update
    const handleSave = async () => {
        if (!redxBaseUrl || !redxApiKey || !redxApiSecret) {
            message.warning('Please fill all fields!');
            return;
        }
        try {
            const payload = {
                base_url: redxBaseUrl,
                apiKey: redxApiKey,
                apiSecret: redxApiSecret,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/redx/update-redx`,
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
                message.success('RedX updated!');
                fetchSettings();
            } else message.error(data.message || 'Failed to update!');
        } catch {
            message.error('Failed to update RedX!');
        }
    };

    // ✅ Remove
    const handleRemove = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/redx/delete-redx`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            const data = await res.json();
            if (!data.error) {
                setRedxBaseUrl('https://api.redx.com');
                setRedxApiKey('');
                setRedxApiSecret('');
                setHasExistingData(false);
                message.success('RedX removed!');
            } else {
                message.error(data.message || 'Failed to remove!');
            }
        } catch {
            message.error('Failed to remove RedX!');
        }
    };

    return (
        <div className="mt-8 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-inner">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Configure RedX
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <PasswordInput
                    label="Base URL"
                    value={redxBaseUrl}
                    onChange={setRedxBaseUrl}
                />
                <PasswordInput
                    label="API Key"
                    value={redxApiKey}
                    onChange={setRedxApiKey}
                />
                <PasswordInput
                    label="API Secret"
                    value={redxApiSecret}
                    onChange={setRedxApiSecret}
                />
            </div>

            <div className="flex justify-end gap-4">
                {hasExistingData ? (
                    <>
                        <button
                            onClick={handleRemove}
                            className="flex items-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                        >
                            <Trash2 className="w-4 h-4 mr-2" /> Remove
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
                        >
                            <Save className="w-4 h-4 mr-2" /> Update
                        </button>
                    </>
                ) : (
                    <button
                        onClick={handleCreate}
                        className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
                    >
                        <Save className="w-4 h-4 mr-2" /> Save
                    </button>
                )}
            </div>
        </div>
    );
};
