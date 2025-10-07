import {
    ShoppingBag,
    PackageCheck,
    FileMinus2,
    HandCoins,
    Scroll,
    CreditCard,
    CircleDollarSign,
    ShoppingCart,
    DollarSign,
} from 'lucide-react';
import CustomerShocaseCart from './CustomerShocaseCart';

const CustomerShowcase = ({ orders }) => {
    // Orders Summary
    const totalOrders = orders?.length || 0;
    const totalAmountOrders =
        orders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
    const delivered =
        orders?.filter(o => o.order_status === 'delivered').length || 0;
    const cancelled =
        orders?.filter(o => o.order_status === 'cancelled').length || 0;

    const cartInfo = [
        // Orders Section
        {
            id: 0,
            title: 'Orders',
            subAmount: totalOrders,
            amount: totalAmountOrders,
            icon: <ShoppingBag className="md:w-auto w-[18px]" />,
        },
        {
            id: 1,
            title: 'Deliveries',
            subAmount: delivered,
            amount: totalAmountOrders,
            icon: <PackageCheck className="md:w-auto w-[18px]" />,
        },
        {
            id: 2,
            title: 'Return',
            subAmount: cancelled,
            amount: 0,
            icon: <FileMinus2 className="md:w-auto w-[18px]" />,
        },
        {
            id: 6,
            title: 'Outstanding Balance',
            amount: totalAmountOrders,
            icon: <CircleDollarSign className="md:w-auto w-[18px]" />,
        },
    ];

    return (
        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-6 gap-2 mt-6">
            {cartInfo.map(itm => (
                <CustomerShocaseCart
                    key={itm.id}
                    itm={itm}
                />
            ))}
        </div>
    );
};

export default CustomerShowcase;
