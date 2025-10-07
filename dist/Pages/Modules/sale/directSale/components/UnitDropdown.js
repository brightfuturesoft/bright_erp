import { jsx as _jsx } from 'react/jsx-runtime';
import { Select } from 'antd';
const units = [
    { label: 'Kilogram (kg)', value: 'kg' },
    { label: 'Gram (g)', value: 'g' },
    { label: 'Piece (pcs)', value: 'pcs' },
    { label: 'Liter (ltr)', value: 'ltr' },
    { label: 'Milliliter (ml)', value: 'ml' },
    { label: 'Packet (pkt)', value: 'pkt' },
    { label: 'Dozen (doz)', value: 'doz' },
];
const UnitDropdown = ({ value, onChange }) => {
    return _jsx(Select, {
        placeholder: 'Select Unit',
        style: { width: '100%' },
        value: value,
        onChange: onChange,
        options: units,
        showSearch: true,
        optionFilterProp: 'label',
    });
};
export default UnitDropdown;
