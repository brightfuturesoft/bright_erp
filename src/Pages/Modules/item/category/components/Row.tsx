import { useState } from 'react';
import ChevronIcon from './ChevronIcon';
import { EllipsisVertical } from 'lucide-react';

interface RowProps {
    title: string;
    children?: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleRow = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    return (
        <div className="border-gray-200 bg-white hover:bg-gray-50 shadow-lg border w-full transition-all duration-200 cursor-pointer">
            <button
                type="button"
                className="flex justify-between items-center px-4 py-5 sm:p-6 w-full"
                onClick={toggleRow}
            >
                <span className="flex font-semibold text-black text-lg">
                    {title}
                </span>
                <div className="flex gap-2">
                    {children && <ChevronIcon isOpen={isOpen} />}
                    <EllipsisVertical />
                </div>
            </button>
            {children && isOpen && (
                <div className="px-4 sm:px-6 pb-5 sm:pb-6">{children}</div>
            )}
        </div>
    );
};

export default Row;
