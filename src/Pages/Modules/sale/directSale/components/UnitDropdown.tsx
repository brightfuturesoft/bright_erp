import React from 'react';
import { Select } from 'antd';

interface UnitDropdownProps {
    value?: string; // AntD Form থেকে আসবে
    onChange?: (value: string) => void; // AntD Form থেকে আসবে
}

const units = [
    { label: 'Kilogram (kg)', value: 'kg' },
    { label: 'Gram (g)', value: 'g' },
    { label: 'Piece (pcs)', value: 'pcs' },
    { label: 'Liter (ltr)', value: 'ltr' },
    { label: 'Milliliter (ml)', value: 'ml' },
    { label: 'Packet (pkt)', value: 'pkt' },
    { label: 'Dozen (doz)', value: 'doz' },
];

const UnitDropdown: React.FC<UnitDropdownProps> = ({ value, onChange }) => {
    return (
        <Select
            placeholder="Select Unit"
            style={{ width: '100%' }}
            value={value}
            onChange={onChange}
            options={units}
            showSearch
            optionFilterProp="label"
        />
    );
};

export default UnitDropdown;
