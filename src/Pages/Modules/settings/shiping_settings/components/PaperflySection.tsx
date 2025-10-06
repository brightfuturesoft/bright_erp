import { useEffect, useState } from 'react';
import { message } from 'antd';
import { Plus, Save, Trash2 } from 'lucide-react';
import { PasswordInput } from './PasswordInput';

interface PaperflyProps {
    paperflyBaseUrl: string;
    setPaperflyBaseUrl: (val: string) => void;
    paperflyApiKey: string;
    setPaperflyApiKey: (val: string) => void;
    paperflyApiSecret: string;
    setPaperflyApiSecret: (val: string) => void;
    user: any;
    fetchSettings: () => Promise<any>;
}

export const PaperflySection: React.FC<PaperflyProps> = ({
    paperflyBaseUrl,
    setPaperflyBaseUrl,
    paperflyApiKey,
    setPaperflyApiKey,
    paperflyApiSecret,
    setPaperflyApiSecret,
    user,
    fetchSettings,
}) => {
    const [hasExistingData, setHasExistingData] = useState(false);

    useEffect(() => {
        const checkExistingData = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}courier/paperfly/get-paperfly`,
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
                    const paperfly = data.data[0];
                    setPaperflyBaseUrl(paperfly.base_url);
                    setPaperflyApiKey(paperfly.apiKey);
                    setPaperflyApiSecret(paperfly.apiSecret);
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
        if (!paperflyBaseUrl || !paperflyApiKey || !paperflyApiSecret) {
            message.warning('Please fill all fields!');
            return;
        }
        try {
            const payload = {
                base_url: paperflyBaseUrl,
                apiKey: paperflyApiKey,
                apiSecret: paperflyApiSecret,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/paperfly/create-paperfly`,
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
                message.success('Paperfly created!');
                setHasExistingData(true);
                fetchSettings();
            } else message.error(data.message || 'Failed to create!');
        } catch {
            message.error('Failed to create Paperfly!');
        }
    };

    // ✅ Update
    const handleSave = async () => {
        if (!paperflyBaseUrl || !paperflyApiKey || !paperflyApiSecret) {
            message.warning('Please fill all fields!');
            return;
        }
        try {
            const payload = {
                base_url: paperflyBaseUrl,
                apiKey: paperflyApiKey,
                apiSecret: paperflyApiSecret,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/paperfly/update-paperfly`,
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
                message.success('Paperfly updated!');
                fetchSettings();
            } else message.error(data.message || 'Failed to update!');
        } catch {
            message.error('Failed to update Paperfly!');
        }
    };

    // ✅ Remove
    const handleRemove = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/paperfly/delete-paperfly`,
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
                setPaperflyBaseUrl('https://api.paperfly.com');
                setPaperflyApiKey('');
                setPaperflyApiSecret('');
                setHasExistingData(false);
                message.success('Paperfly removed!');
            } else {
                message.error(data.message || 'Failed to remove!');
            }
        } catch {
            message.error('Failed to remove Paperfly!');
        }
    };

    return (
        <div className="mt-8 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-inner">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Configure Paperfly
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <PasswordInput
                    label="Base URL"
                    value={paperflyBaseUrl}
                    onChange={setPaperflyBaseUrl}
                />
                <PasswordInput
                    label="API Key"
                    value={paperflyApiKey}
                    onChange={setPaperflyApiKey}
                />
                <PasswordInput
                    label="API Secret"
                    value={paperflyApiSecret}
                    onChange={setPaperflyApiSecret}
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
