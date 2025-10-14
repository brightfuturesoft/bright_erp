import React, { useCallback } from 'react';
import { Courier, CourierId } from '../Data_Type';

interface CustomRadioProps {
    courier: Courier;
    isSelected: boolean;
    onSelect: (id: CourierId) => void;
    otherServices?: boolean;
}

export const CustomRadio: React.FC<CustomRadioProps> = ({
    courier,
    isSelected,
    onSelect,
    otherServices = false,
}) => {
    const Logo = useCallback(({ id }: { id: CourierId }) => {
        const images: Record<CourierId, string> = {
            RX: 'https://placehold.co/60x40/FFD700/000?text=RX',
            PATHAO: 'https://merchant.zatiqeasy.com/assets/pathao.png',
            STEADFAST: 'https://merchant.zatiqeasy.com/assets/steadfast.png',
            REDX: 'https://merchant.zatiqeasy.com/assets/redx.png',
            PAPERFLY: 'https://merchant.zatiqeasy.com/assets/paperfly.png',
        };

        return (
            <img
                src={images[id]}
                alt={id}
                className="h-8 w-auto object-contain"
                onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/60x40/ccc/000?text=Logo';
                }}
            />
        );
    }, []);

    const containerClasses = otherServices
        ? 'flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all w-1/2 sm:w-1/4 min-w-[120px] shadow-sm hover:shadow-md'
        : 'flex items-center cursor-pointer transition-all p-3';

    const selectedClasses = isSelected
        ? 'border-red-500 ring-2 ring-red-200 bg-red-50'
        : 'border-gray-300 hover:border-red-400 bg-white';

    return (
        <div
            className={`${containerClasses} ${otherServices ? selectedClasses : ''}`}
            onClick={() => onSelect(courier.id)}
        >
            {/* Modern Radio Button */}
            {!otherServices && (
                <div className="mr-3 flex-shrink-0 flex items-center justify-center">
                    <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-red-500 bg-red-100' : 'border-gray-400 bg-white'}`}
                    >
                        {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        )}
                    </div>
                </div>
            )}

            <div className="flex flex-col items-start flex-grow">
                <div className="flex items-center gap-2">
                    <Logo id={courier.id} />
                </div>

                {!otherServices && courier.id === 'STEADFAST' && (
                    <p className="text-sm text-gray-500 mt-1">
                        SteadFast Courier | Please{' '}
                        <a
                            href="#"
                            className="text-blue-500 hover:underline"
                        >
                            sign up
                        </a>{' '}
                        to get started. Use coupon code "ORYBIZ%STEADFAST" for
                        special discount.
                    </p>
                )}
            </div>
        </div>
    );
};
