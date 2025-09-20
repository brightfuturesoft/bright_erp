'use client';

import { useContext, useState, useEffect, useRef } from 'react';
import { Check, Brush, Star } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { message } from 'antd';

export default function ThemeCustomizer() {
    const { workspace, user } = useContext(Erp_context);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const [selectedTheme, setSelectedTheme] = useState('ecommerce1');
    const [primaryColor, setPrimaryColor] = useState('#0000');
    const [secondaryColor, setSecondaryColor] = useState('#f43f5e');
    const [buyNowEnabled, setBuyNowEnabled] = useState(true);
    const [editingTheme, setEditingTheme] = useState<any>(null);

    const [mode, setMode] = useState('desktop');

    const sizes = {
        phone: 'w-[375px] h-[667px]',
        tablet: 'w-[768px] h-[1024px]',
        desktop: 'w-[1280px] h-[800px]',
    };

    const themes = [
        { name: 'ecommerce1', preview: '/image.png' },
        { name: 'ecommerce2', preview: '/ecommerce2.png' },
        { name: 'ecommerce3', preview: '/ecommerce3.png' },
        { name: 'ecommerce4', preview: '/ecommerce4.png' },
    ];

    useEffect(() => {
        const fetchThemes = async () => {
            if (!workspace?._id) return;
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}ecommerce/themes/get-theme`,
                    {
                        headers: {
                            Authorization: user._id,
                            workspace_id: workspace._id,
                        },
                    }
                );
                const data = await res.json();
                if (!data.error && data.data.length) {
                    setSelectedTheme(data.data);
                    const theme = data.data[0];
                    setSelectedTheme(theme.selectedTheme);
                    setPrimaryColor(theme.primaryColor);
                    setSecondaryColor(theme.secondaryColor);
                    setBuyNowEnabled(theme.buyNowEnabled);
                    setEditingTheme(theme);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchThemes();
    }, [workspace?._id]);

    useEffect(() => {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (iframeWindow) {
            iframeWindow.postMessage(
                {
                    theme: selectedTheme,
                    primaryColor,
                    secondaryColor,
                    buyNowEnabled,
                    workspace_id: workspace?._id,
                },
                '*'
            );
        }
    }, [
        selectedTheme,
        primaryColor,
        secondaryColor,
        buyNowEnabled,
        workspace?._id,
    ]);

    const handleSubmit = async () => {
        if (!workspace?._id) return;
        try {
            const themeData: any = {
                selectedTheme,
                primaryColor,
                secondaryColor,
                buyNowEnabled,
                workspace_id: workspace._id,
            };

            let url = `${import.meta.env.VITE_BASE_URL}ecommerce/themes/create-theme`;
            let method: 'POST' | 'PATCH' = 'POST';
            if (editingTheme?._id) {
                url = `${import.meta.env.VITE_BASE_URL}ecommerce/themes/update-theme`;
                method = 'PATCH';
                themeData.id = editingTheme._id;
            }

            const res = await fetch(url, {
                method,
                headers: {
                    Authorization: user._id,
                    workspace_id: workspace._id,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(themeData),
            });

            const result = await res.json();

            if (result.error) {
                message.error(result.message);
            } else {
                setEditingTheme(result.data);
                message.success(
                    editingTheme
                        ? 'Theme updated successfully'
                        : 'Theme created successfully'
                );
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to save theme');
        }
    };

    return (
        <div className="min-h-screen dark:bg-gray-900 bg-gray-50 p-4 md:p-8">
            <div className="mx-auto">
                <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-8">
                    Customize Theme
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                    {themes.map(theme => (
                        <div
                            key={theme.name}
                            className={`relative bg-white rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                                selectedTheme === theme.name
                                    ? 'border-blue-500 shadow-lg'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedTheme(theme.name)}
                        >
                            <div className="p-4">
                                <div className="aspect-[3/2] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                    <img
                                        src={
                                            theme.preview || '/placeholder.svg'
                                        }
                                        alt={`${theme.name} theme preview`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`font-medium ${selectedTheme === theme.name ? 'text-blue-600' : 'text-gray-700'}`}
                                    >
                                        {theme.name}
                                    </span>
                                    {selectedTheme === theme.name && (
                                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600 rounded-xl p-6 flex flex-col items-center justify-center text-white min-h-[200px]">
                        <Star className="w-8 h-8 mb-3" />
                        <span className="font-medium text-center">
                            More themes coming
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Primary Color
                        </h3>
                        <input
                            type="color"
                            value={primaryColor}
                            onChange={e => setPrimaryColor(e.target.value)}
                            className="w-full h-12 cursor-pointer rounded-full border-none"
                        />
                    </div>

                    <div className="bg-white rounded-xl p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Secondary Color
                        </h3>
                        <input
                            type="color"
                            value={secondaryColor}
                            onChange={e => setSecondaryColor(e.target.value)}
                            className="w-full h-12 cursor-pointer rounded-full border-none"
                        />
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Enable Buy Now Button
                        </h3>
                        <div className="flex gap-2">
                            <button
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                                    buyNowEnabled
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                onClick={() => setBuyNowEnabled(true)}
                            >
                                Yes
                                {buyNowEnabled && <Check className="w-4 h-4" />}
                            </button>
                            <button
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                                    !buyNowEnabled
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                onClick={() => setBuyNowEnabled(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium mb-6"
                >
                    Save Theme
                </button>
                <div className="flex flex-col items-center p-6 space-y-4 min-h-screen">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setMode('phone')}
                            className={`px-4 py-2 rounded-lg ${mode === 'phone' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
                        >
                            📱 Phone
                        </button>
                        <button
                            onClick={() => setMode('tablet')}
                            className={`px-4 py-2 rounded-lg ${mode === 'tablet' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
                        >
                            📱 Tablet
                        </button>
                        <button
                            onClick={() => setMode('desktop')}
                            className={`px-4 py-2 rounded-lg ${mode === 'desktop' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
                        >
                            🖥️ Desktop
                        </button>
                    </div>

                    <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
                        <iframe
                            ref={iframeRef}
                            src={`https://${workspace?.domain_info?.domain ? workspace?.domain_info?.domain : workspace?.domain_info?.subdomain}`}
                            title="Preview"
                            className={`${sizes[mode]} border-0`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
