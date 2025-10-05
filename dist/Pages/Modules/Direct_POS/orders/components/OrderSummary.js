import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Briefcase, LineChart, Plus } from 'lucide-react';
export default function OrdersSummary({ orders }) {
    if (!orders || orders.length === 0) {
        return _jsx('p', { children: 'No orders found' });
    }
    const totals = orders.reduce(
        (acc, order) => {
            const subTotal =
                order.total_amount -
                order.tax_amount -
                order.shipping_charge +
                order.discount;
            acc.subTotalAmount += subTotal;
            acc.subTotalTax += order.tax_amount;
            acc.grandTotalAmount += order.total_amount;
            return acc;
        },
        { subTotalAmount: 0, subTotalTax: 0, grandTotalAmount: 0 }
    );
    return _jsxs('div', {
        className: 'flex flex-wrap gap-5',
        children: [
            _jsx(InfoCard, {
                title: 'Sub Total Amount',
                amount: totals.subTotalAmount,
                icon: _jsx(Briefcase, {}),
            }),
            _jsx(InfoCard, {
                title: 'Sub Total Tax',
                amount: totals.subTotalTax,
                icon: _jsx(LineChart, {}),
            }),
            _jsx(InfoCard, {
                title: 'Grand Total Amount',
                amount: totals.grandTotalAmount,
                icon: _jsx(Plus, {}),
            }),
        ],
    });
}
function InfoCard({ title, amount, icon }) {
    return _jsxs('div', {
        className: 'bg-white rounded-2xl shadow p-4 flex flex-col items-start',
        children: [
            _jsxs('div', {
                className: 'flex items-center gap-2 text-gray-600',
                children: [
                    icon,
                    _jsx('span', { className: 'text-sm', children: title }),
                ],
            }),
            _jsx('div', {
                className: 'text-xl font-semibold mt-2',
                children: amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }),
            }),
        ],
    });
}
