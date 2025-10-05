import { jsx as _jsx } from 'react/jsx-runtime';
import {
    ShoppingBag,
    PackageCheck,
    FileMinus2,
    HandCoins,
    Scroll,
    CreditCard,
    CircleDollarSign,
} from 'lucide-react';
import CustomerShocaseCart from './CustomerShowCaseCart';
const CustomerShowcase = ({ orders }) => {
    const totalOrders = orders?.length || 0;
    const totalAmount =
        orders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
    const delivered =
        orders?.filter(o => o.order_status === 'delivered').length || 0;
    const cancelled =
        orders?.filter(o => o.order_status === 'cancelled').length || 0;
    const cartInfo = [
        {
            id: 0,
            title: 'Orders',
            subAmount: totalOrders,
            amount: totalAmount,
            icon: _jsx(ShoppingBag, { className: 'md:w-auto w-[18px]' }),
        },
        {
            id: 1,
            title: 'Deliveries',
            subAmount: delivered,
            amount: totalAmount,
            icon: _jsx(PackageCheck, { className: 'md:w-auto w-[18px]' }),
        },
        {
            id: 2,
            title: 'Cancelled',
            subAmount: cancelled,
            amount: 0,
            icon: _jsx(FileMinus2, { className: 'md:w-auto w-[18px]' }),
        },
        {
            id: 3,
            title: 'Payments',
            subAmount: totalOrders,
            amount: totalAmount,
            icon: _jsx(HandCoins, { className: 'md:w-auto w-[18px]' }),
        },
        {
            id: 4,
            title: 'Credit Memos',
            subAmount: 0,
            amount: 0,
            icon: _jsx(Scroll, { className: 'md:w-auto w-[18px]' }),
        },
        {
            id: 5,
            title: 'Applied Credit Memos',
            subAmount: 0,
            amount: 0,
            icon: _jsx(CreditCard, { className: 'md:w-auto w-[18px]' }),
        },
        {
            id: 6,
            title: 'Outstanding Balance',
            amount: totalAmount,
            icon: _jsx(CircleDollarSign, { className: 'md:w-auto w-[18px]' }),
        },
    ];
    return _jsx('div', {
        className: 'grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-2 mt-6',
        children: cartInfo.map(itm =>
            _jsx(CustomerShocaseCart, { itm: itm }, itm.id)
        ),
    });
};
export default CustomerShowcase;
