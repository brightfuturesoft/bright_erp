import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Modal, Input } from 'antd';
const Hold_order_modal = ({
    is_hold_modal_visible,
    set_is_hold_modal_visible,
    holdOrderReference,
    setHoldOrderReference,
    total,
    confirm_hold_order,
}) =>
    _jsx(Modal, {
        title: 'Hold Order',
        open: is_hold_modal_visible,
        onOk: confirm_hold_order,
        onCancel: () => {
            set_is_hold_modal_visible(false);
            setHoldOrderReference('');
        },
        okText: 'Hold Order',
        cancelText: 'Cancel',
        className: 'hold-order-modal dark:bg-gray-800 dark:text-white rounded',
        bodyStyle: { backgroundColor: 'inherit' },
        children: _jsxs('div', {
            className: 'mb-4',
            children: [
                _jsxs('div', {
                    className: 'text-lg font-semibold mb-2',
                    children: [
                        _jsx('span', {
                            className: 'kalpurush-font',
                            children: '\u09F3',
                        }),
                        total.toFixed(2),
                    ],
                }),
                _jsx('p', {
                    className: 'text-gray-600 dark:text-gray-300 mb-4',
                    children:
                        'The current order will be set on hold. You can retrieve this order from the pending order button. Providing a reference to it might help you to identify the order more quickly.',
                }),
                _jsx('label', {
                    className:
                        'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2',
                    children: 'Order Reference *',
                }),
                _jsx(Input, {
                    value: holdOrderReference,
                    onChange: e => setHoldOrderReference(e.target.value),
                    placeholder: 'Enter order reference',
                    className:
                        'w-full dark:bg-gray-700 dark:text-white dark:border-gray-600',
                }),
            ],
        }),
    });
export default Hold_order_modal;
