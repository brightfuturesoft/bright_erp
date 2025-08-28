import React from 'react';

interface ColorBoxProps {
    color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color }) => {
    return (
        <div
            className="w-10 h-10 rounded-full border border-gray-200"
            style={{ backgroundColor: color }}
        />
    );
};

export default ColorBox;
