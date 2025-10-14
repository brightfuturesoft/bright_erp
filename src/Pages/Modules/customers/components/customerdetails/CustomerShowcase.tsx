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

const CustomerShowcase = ({ orders, userCart }) => {
    console.log(userCart);

    // Orders Summary
    const totalOrders = orders?.length || 0;
    const totalAmountOrders =
        orders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
    const delivered =
        orders?.filter(o => o.order_status === 'delivered').length || 0;
    const cancelled =
        orders?.filter(o => o.order_status === 'cancelled').length || 0;

    // Cart Summary
    const totalCartProducts = userCart?.length || 0;
    const totalCartAmount =
        userCart?.reduce((sum, item) => sum + item['0'].order_price, 0) || 0;

    console.log('totalCartAmount', totalCartAmount);

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
            title: 'Cancelled',
            subAmount: cancelled,
            amount: 0,
            icon: <FileMinus2 className="md:w-auto w-[18px]" />,
        },
        {
            id: 3,
            title: 'Payments',
            subAmount: totalOrders,
            amount: totalAmountOrders,
            icon: <HandCoins className="md:w-auto w-[18px]" />,
        },

        {
            id: 6,
            title: 'Outstanding Balance',
            amount: totalAmountOrders,
            icon: <CircleDollarSign className="md:w-auto w-[18px]" />,
        },
        // Cart Section
        {
            id: 7,
            title: 'Cart Products',
            subAmount: totalCartProducts,
            amount: totalCartAmount,
            icon: <ShoppingCart className="md:w-auto w-[18px]" />,
        },
        {
            id: 8,
            title: 'Cart Total Amount',
            amount: totalCartAmount,
            icon: <DollarSign className="md:w-auto w-[18px]" />,
        },
        {
            id: 9,
            title: 'Wishlist Products',
            subAmount: 0,
            amount: totalCartAmount,
            icon: <ShoppingCart className="md:w-auto w-[18px]" />,
        },
        {
            id: 10,
            title: 'Wishlist Total Amount',
            amount: 0,
            icon: <DollarSign className="md:w-auto w-[18px]" />,
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
