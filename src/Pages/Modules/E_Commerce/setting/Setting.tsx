'use client';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { message } from 'antd';

import ThemeSelector from './ThemeSelector';
import ColorPicker from './ColorPicker';
import BuyNowToggle from './BuyNowToggle';
import PreviewModeSwitcher from './PreviewModeSwitcher';
import PreviewIframe from './PreviewIframe';

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

    // Fetch saved theme
    useEffect(() => {
        if (!workspace?._id) return;
        const fetchThemes = async () => {
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

    // Send theme data to iframe
    useEffect(() => {
        const iframeWindow = iframeRef.current?.contentWindow;
        if (!iframeWindow) return;

        const themePayload = {
            selectedTheme,
            primaryColor,
            secondaryColor,
            buyNowEnabled,
            workspace_id: workspace?._id,
            timestamp: new Date().getTime(), // ensures fresh updates
        };

        iframeWindow.postMessage(themePayload, '*');
    }, [
        selectedTheme,
        primaryColor,
        secondaryColor,
        buyNowEnabled,
        workspace?._id,
    ]);

    // Save or update theme
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
            if (result.error) message.error(result.message);
            else {
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
            <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-8">
                Customize Theme
            </h1>

            {/* Theme Selection */}
            <ThemeSelector
                themes={themes}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
            />

            {/* Color Pickers & Buy Now Toggle */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <ColorPicker
                    label="Primary Color"
                    color={primaryColor}
                    setColor={setPrimaryColor}
                />
                <ColorPicker
                    label="Secondary Color"
                    color={secondaryColor}
                    setColor={setSecondaryColor}
                />
                <BuyNowToggle
                    enabled={buyNowEnabled}
                    setEnabled={setBuyNowEnabled}
                />
            </div>

            {/* Save Button */}
            <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium mb-6"
            >
                Save Theme
            </button>

            {/* Preview */}
            <div className="flex flex-col items-center p-6 space-y-4 min-h-screen">
                <PreviewModeSwitcher
                    mode={mode}
                    setMode={setMode}
                />
                <PreviewIframe
                    refProp={iframeRef}
                    mode={mode}
                    sizes={sizes}
                    domain={
                        workspace?.domain_info?.domain ||
                        workspace?.domain_info?.subdomain
                    }
                />
            </div>
        </div>
    );
}
