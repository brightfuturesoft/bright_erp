import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { CourierId } from './Data_Type';
import { DeliveryServiceCollapse } from './components/DeliveryServiceCollapse';
import { IntegrateServicesCollapse } from './components/IntegrateServicesCollapse';
import { message } from 'antd';
import { Banner } from './components/Banner';
import { COURIERS } from './Data';

export default function Shiping_Setting() {
    const { user } = useContext(Erp_context);
    if (!user) return 'Loading';

    const [darkMode, setDarkMode] = useState(true);
    const [selectedCourier, setSelectedCourier] = useState<CourierId>('RX');

    // Steedfast fields
    const [steedfastApiKey, setSteedfastApiKey] = useState('');
    const [steedfastApiSecret, setSteedfastApiSecret] = useState('');

    // Pathao fields
    const [pathaoBaseUrl, setPathaoBaseUrl] = useState('');
    const [pathaoClientId, setPathaoClientId] = useState('');
    const [pathaoClientSecret, setPathaoClientSecret] = useState('');

    // Paperfly fields
    const [paperflyApiKey, setPaperflyApiKey] = useState('');
    const [paperflyApiSecret, setPaperflyApiSecret] = useState('');
    const [paperflyBaseUrl, setPaperflyBaseUrl] = useState('');

    // RedX fields
    const [redxApiKey, setRedxApiKey] = useState('');
    const [redxApiSecret, setRedxApiSecret] = useState('');
    const [redxBaseUrl, setRedxBaseUrl] = useState('');

    // Fetch saved settings
    const fetchSettings = async () => {
        try {
            // Steedfast settings
            const steedRes = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/steedfast/get-steedfast`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            const steedData = await steedRes.json();
            if (!steedData.error && steedData.data.length > 0) {
                setSelectedCourier('STEADFAST');
                setSteedfastApiKey(steedData.data[0].apiKey || '');
                setSteedfastApiSecret(steedData.data[0].apiSecret || '');
            }

            // Pathao settings
            const pathaoRes = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/pathao/get-pathao`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            const pathaoData = await pathaoRes.json();
            if (!pathaoData.error && pathaoData.data.length > 0) {
                setSelectedCourier('PATHAO');
                setPathaoClientId(pathaoData.data[0].client_id || '');
                setPathaoClientSecret(pathaoData.data[0].client_secret || '');
                setPathaoBaseUrl(pathaoData.data[0].base_url || '');
            }

            // Paperfly settings
            const paperflyRes = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/paperfly/get-paperfly`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            const paperflyData = await paperflyRes.json();
            if (!paperflyData.error && paperflyData.data.length > 0) {
                setSelectedCourier('PAPERFLY');
                setPaperflyApiKey(paperflyData.data[0].apiKey || '');
                setPaperflyApiSecret(paperflyData.data[0].apiSecret || '');
                setPaperflyBaseUrl(paperflyData.data[0].base_url || '');
            }

            // RedX settings
            const redxRes = await fetch(
                `${import.meta.env.VITE_BASE_URL}courier/redx/get-redx`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            const redxData = await redxRes.json();
            if (!redxData.error && redxData.data.length > 0) {
                setSelectedCourier('RX');
                setRedxApiKey(redxData.data[0].apiKey || '');
                setRedxApiSecret(redxData.data[0].apiSecret || '');
                setRedxBaseUrl(redxData.data[0].base_url || '');
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to fetch shipping settings!');
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    useEffect(() => {
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [darkMode]);

    const handleCourierSelect = useCallback((id: CourierId) => {
        setSelectedCourier(id);
    }, []);

    return (
        <div>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors p-4 sm:p-8">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
                        Delivery Support
                    </h1>
                </header>

                <div className="mx-auto">
                    <Banner />

                    <DeliveryServiceCollapse />
                    <IntegrateServicesCollapse
                        couriers={COURIERS}
                        selectedCourier={selectedCourier}
                        onSelectCourier={handleCourierSelect}
                        // Steedfast props
                        apiKey={steedfastApiKey}
                        setApiKey={setSteedfastApiKey}
                        apiSecret={steedfastApiSecret}
                        setApiSecret={setSteedfastApiSecret}
                        // Pathao props
                        pathaoBaseUrl={pathaoBaseUrl}
                        setPathaoBaseUrl={setPathaoBaseUrl}
                        pathaoClientId={pathaoClientId}
                        setPathaoClientId={setPathaoClientId}
                        pathaoClientSecret={pathaoClientSecret}
                        setPathaoClientSecret={setPathaoClientSecret}
                        // Paperfly props
                        paperflyApiKey={paperflyApiKey}
                        setPaperflyApiKey={setPaperflyApiKey}
                        paperflyApiSecret={paperflyApiSecret}
                        setPaperflyApiSecret={setPaperflyApiSecret}
                        paperflyBaseUrl={paperflyBaseUrl}
                        setPaperflyBaseUrl={setPaperflyBaseUrl}
                        // RedX props
                        redxApiKey={redxApiKey}
                        setRedxApiKey={setRedxApiKey}
                        redxApiSecret={redxApiSecret}
                        setRedxApiSecret={setRedxApiSecret}
                        redxBaseUrl={redxBaseUrl}
                        setRedxBaseUrl={setRedxBaseUrl}
                        user={user}
                        fetchSettings={fetchSettings}
                    />
                </div>
            </div>
        </div>
    );
}
