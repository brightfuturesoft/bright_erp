import {
    BarChart3,
    CircleDollarSign,
    CreditCard,
    FileMinus2,
    HandCoins,
    PackageCheck,
    Scroll,
    ShoppingBag,
} from 'lucide-react';
import React from 'react';
import CustomerShocaseCart from './CustomerShocaseCart';

const CustomerShowcase = () => {
    const cartInfo = [
        {
            id: 0,
            title: 'Orders',
            subAmount: 2,
            amount: 50000,
            path: '',
            icon: <ShoppingBag className="md:w-auto w-[18px]" />,
        },
        {
            id: 1,
            title: 'Deliveries',
            subAmount: 1,
            amount: 70000,
            path: '',
            icon: <PackageCheck className="md:w-auto w-[18px]" />,
        },
        {
            id: 3,
            title: 'Invoice',
            subAmount: 1,
            amount: 70000,
            path: '',
            icon: <FileMinus2 className="md:w-auto w-[18px]" />,
        },
        {
            id: 4,
            title: 'payment',
            subAmount: 1,
            amount: 75000,
            path: '',
            icon: <HandCoins className="md:w-auto w-[18px]" />,
        },
        {
            id: 5,
            title: 'Credit Memos',
            subAmount: 0,
            amount: 100,
            path: '',
            icon: <Scroll className="md:w-auto w-[18px]" />,
        },
        {
            id: 6,
            title: 'Applied Credit Memos',
            // subAmount: 0,
            amount: 0,
            path: '',
            icon: <CreditCard className="md:w-auto w-[18px]" />,
        },
        {
            id: 7,
            title: 'Outstanding Balance',
            // subAmount: 0,
            amount: 50200,
            path: '',
            icon: <CircleDollarSign className="md:w-auto w-[18px]" />,
        },
    ];
    return (
        <div>
            <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-2">
                {cartInfo?.map(itm => (
                    <CustomerShocaseCart
                        key={itm?.id}
                        itm={itm}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomerShowcase;
