import { useEffect, useState } from 'react';
import { message } from 'antd';
import { Plus, Save, Trash2 } from 'lucide-react';
import { PasswordInput } from './PasswordInput';

interface PathaoProps {
    pathaoBaseUrl: string;
    setPathaoBaseUrl: (val: string) => void;
    pathaoClientId: string;
    setPathaoClientId: (val: string) => void;
    pathaoClientSecret: string;
    setPathaoClientSecret: (val: string) => void;
    user: any;
    fetchSettings: () => void;
}

export const PathaoSection: React.FC<PathaoProps> = ({
    pathaoBaseUrl,
    setPathaoBaseUrl,
    pathaoClientId,
    setPathaoClientId,
    pathaoClientSecret,
    setPathaoClientSecret,
    user,
    fetchSettings,
}) => {
    const [hasExistingData, setHasExistingData] = useState(true);

    const handleCreate = async () => {
        if (!pathaoBaseUrl || !pathaoClientId || !pathaoClientSecret) {
            message.warning('Please fill all fields!');
            return;
        }
        try {
            const payload = {
                base_url: pathaoBaseUrl,
                client_id: pathaoClientId,
                client_secret: pathaoClientSecret,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/pathao/create-pathao`,
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
                message.success('Pathao created!');
                setHasExistingData(true);
                fetchSettings();
            } else message.error(data.error);
        } catch {
            message.error('Failed to create Pathao!');
        }
    };

    const handleSave = async () => {
        if (!pathaoBaseUrl || !pathaoClientId || !pathaoClientSecret) {
            message.warning('Please fill all fields!');
            return;
        }
        try {
            const payload = {
                base_url: pathaoBaseUrl,
                client_id: pathaoClientId,
                client_secret: pathaoClientSecret,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/pathao/update-pathao`,
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
                message.success('Pathao updated!');
                fetchSettings();
            } else message.error(data.error);
        } catch {
            message.error('Failed to update Pathao!');
        }
    };

    const handleRemove = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/pathao/delete-pathao`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                }
            );
            setPathaoBaseUrl('https://api-hermes.pathao.com');
            setPathaoClientId('');
            setPathaoClientSecret('');
            setHasExistingData(false);
            message.success('Pathao removed!');
        } catch {
            message.error('Failed to remove Pathao!');
        }
    };

    return (
        <div className="mt-8 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-inner">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" /> Configure Pathao
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <PasswordInput
                    label="Base URL"
                    value={pathaoBaseUrl}
                    onChange={setPathaoBaseUrl}
                />
                <PasswordInput
                    label="Client ID"
                    value={pathaoClientId}
                    onChange={setPathaoClientId}
                />
                <PasswordInput
                    label="Client Secret"
                    value={pathaoClientSecret}
                    onChange={setPathaoClientSecret}
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
