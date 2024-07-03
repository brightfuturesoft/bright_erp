import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChevronIconProps {
    isOpen: boolean;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen }) => {
    if (isOpen) return <ChevronUp />;

    return <ChevronDown />;
};

export default ChevronIcon;
