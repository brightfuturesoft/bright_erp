import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Mail, Phone } from 'lucide-react';
import RelatedInformationTabs from '../ReletedInformation/ReletedInformationTab';
const CustomerInformation = ({ customer }) => {
    if (!customer) return _jsx('p', { children: 'Loading...' });
    return _jsx('div', {
        className: 'mt-12 dark:text-light text-dark',
        children: _jsxs('div', {
            className: 'grid md:grid-cols-4 gap-2',
            children: [
                _jsxs('div', {
                    children: [
                        _jsx('h3', {
                            className:
                                'text-md font-semibold pb-2 dark:text-light text-dark',
                            children: 'Customer Information',
                        }),
                        _jsx('div', {
                            className:
                                'border dark:border-dark-gray md:block flex gap-4 items-start p-4',
                            children: _jsxs('div', {
                                className: 'flex flex-col space-y-1 md:mt-3',
                                children: [
                                    _jsx('span', {
                                        className:
                                            'font-bold text-2xl dark:text-light text-dark text-start',
                                        children: customer.full_name,
                                    }),
                                    _jsxs('a', {
                                        href: `mailto:${customer.email}`,
                                        className:
                                            'md:text-sm text-blue-500 mt-3 flex items-center gap-2 text-xs text-start',
                                        children: [
                                            _jsx(Mail, { size: 14 }),
                                            ' ',
                                            customer.email,
                                        ],
                                    }),
                                    _jsxs('a', {
                                        href: `tel:${customer.phone_number}`,
                                        className:
                                            'md:text-sm text-xs text-green-500 text-start flex items-center gap-2',
                                        children: [
                                            _jsx(Phone, { size: 14 }),
                                            ' ',
                                            customer.phone_number,
                                        ],
                                    }),
                                ],
                            }),
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'md:col-span-3',
                    children: [
                        _jsx('h3', {
                            className:
                                'text-md font-semibold pb-3 dark:text-light text-dark',
                            children: 'Related Information',
                        }),
                        _jsx(RelatedInformationTabs, {
                            customerId: customer._id,
                        }),
                    ],
                }),
            ],
        }),
    });
};
export default CustomerInformation;
