import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useCallback } from 'react';
export const CustomRadio = ({
    courier,
    isSelected,
    onSelect,
    otherServices = false,
}) => {
    const Logo = useCallback(({ id }) => {
        const images = {
            RX: 'https://placehold.co/60x40/FFD700/000?text=RX',
            PATHAO: 'https://merchant.zatiqeasy.com/assets/pathao.png',
            STEADFAST: 'https://merchant.zatiqeasy.com/assets/steadfast.png',
            REDX: 'https://merchant.zatiqeasy.com/assets/redx.png',
            PAPERFLY: 'https://merchant.zatiqeasy.com/assets/paperfly.png',
        };
        return _jsx('img', {
            src: images[id],
            alt: id,
            className: 'h-8 w-auto object-contain',
            onError: e => {
                const target = e.target;
                target.onerror = null;
                target.src = 'https://placehold.co/60x40/ccc/000?text=Logo';
            },
        });
    }, []);
    const containerClasses = otherServices
        ? 'flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all w-1/2 sm:w-1/4 min-w-[120px] shadow-sm hover:shadow-md'
        : 'flex items-center cursor-pointer transition-all p-3';
    const selectedClasses = isSelected
        ? 'border-red-500 ring-2 ring-red-200 bg-red-50'
        : 'border-gray-300 hover:border-red-400 bg-white';
    return _jsxs('div', {
        className: `${containerClasses} ${otherServices ? selectedClasses : ''}`,
        onClick: () => onSelect(courier.id),
        children: [
            !otherServices &&
                _jsx('div', {
                    className:
                        'mr-3 flex-shrink-0 flex items-center justify-center',
                    children: _jsx('div', {
                        className: `w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-red-500 bg-red-100' : 'border-gray-400 bg-white'}`,
                        children:
                            isSelected &&
                            _jsx('div', {
                                className:
                                    'w-2.5 h-2.5 rounded-full bg-red-500',
                            }),
                    }),
                }),
            _jsxs('div', {
                className: 'flex flex-col items-start flex-grow',
                children: [
                    _jsx('div', {
                        className: 'flex items-center gap-2',
                        children: _jsx(Logo, { id: courier.id }),
                    }),
                    !otherServices &&
                        courier.id === 'STEADFAST' &&
                        _jsxs('p', {
                            className: 'text-sm text-gray-500 mt-1',
                            children: [
                                'SteadFast Courier | Please',
                                ' ',
                                _jsx('a', {
                                    href: '#',
                                    className: 'text-blue-500 hover:underline',
                                    children: 'sign up',
                                }),
                                ' ',
                                'to get started. Use coupon code "ORYBIZ%STEADFAST" for special discount.',
                            ],
                        }),
                ],
            }),
        ],
    });
};
