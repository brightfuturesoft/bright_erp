'use client';
import React, { useState, useEffect } from 'react';

interface ColorPickerProps {
    label: string;
    color: string;
    setColor: (color: string) => void;
}

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
    let cleaned = hex.replace('#', '');
    if (cleaned.length === 3) {
        cleaned = cleaned
            .split('')
            .map(c => c + c)
            .join('');
    }
    const bigint = parseInt(cleaned, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
    label,
    color,
    setColor,
}) => {
    const [rgb, setRgb] = useState(hexToRgb(color));

    useEffect(() => {
        setRgb(hexToRgb(color));
    }, [color]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-4">
                {label}
            </h3>
            <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="w-full h-12 cursor-pointer rounded-full border-none"
            />
            <div className="mt-2 text-gray-800 dark:text-gray-200 font-medium">
                HEX: {color.toUpperCase()} <br />
                RGB: {rgb}
            </div>
        </div>
    );
};

export default ColorPicker;
