import { Select } from 'antd';
import { unitOptions } from './unitOptions';

interface UnitDropdownProps {
    value?: string;
    onChange?: (value: string) => void;
}

export const UnitDropdown: React.FC<UnitDropdownProps> = ({
    value,
    onChange,
}) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            placeholder="Select Unit"
            options={unitOptions}
        />
    );
};
