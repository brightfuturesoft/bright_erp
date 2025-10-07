import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Button } from 'antd';
import { BadgeCheck } from 'lucide-react';
const Payment_completed_modal = ({
    is_payment_modal_visible,
    set_is_payment_modal_visible,
    set_is_receipt_modal_visible,
    continue_without_print,
}) =>
    _jsx(Modal, {
        title: 'Payment Completed',
        open: is_payment_modal_visible,
        footer: null,
        onCancel: () => set_is_payment_modal_visible(false),
        className: 'payment-modal dark:bg-gray-800 dark:text-white rounded',
        bodyStyle: { backgroundColor: 'inherit' },
        children: _jsxs('div', {
            className: 'text-center',
            children: [
                _jsxs('div', {
                    className: 'mb-6',
                    children: [
                        _jsx('div', {
                            className:
                                'text-green-500  mb-4 flex justify-center',
                            children: _jsx(BadgeCheck, {
                                className: 'text-6xl w-16 h-16',
                            }),
                        }),
                        _jsx('p', {
                            className: 'text-lg mb-4 dark:text-gray-300',
                            children:
                                'Do you want to Print Receipt for the Completed Order?',
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'flex gap-4 justify-center',
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            onClick: () => {
                                (set_is_receipt_modal_visible(true),
                                    set_is_payment_modal_visible(false));
                            },
                            className: 'bg-blue-600',
                            children: 'Print Receipt',
                        }),
                        _jsx(Button, {
                            onClick: continue_without_print,
                            className:
                                'dark:bg-gray-700 dark:text-white dark:border-gray-600',
                            children: 'Continue',
                        }),
                    ],
                }),
            ],
        }),
    });
export default Payment_completed_modal;
