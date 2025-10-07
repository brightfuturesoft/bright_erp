import { jsx as _jsx } from 'react/jsx-runtime';
import { Select } from 'antd';
import { unitOptions } from './unitOptions';
export const UnitDropdown = ({ value, onChange }) => {
    return _jsx(Select, {
        value: value,
        onChange: onChange,
        placeholder: 'Select Unit',
        options: unitOptions,
    });
};
