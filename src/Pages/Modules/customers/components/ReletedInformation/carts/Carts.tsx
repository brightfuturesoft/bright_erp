import React, { useContext, useMemo } from 'react';

import { useCartData } from './data_get_api';
import { Erp_context } from '@/provider/ErpContext';
import CartTable from './Cart_Table';

const Carts = ({ userCart }) => {
    const { cart } = useCartData();
    const { user } = useContext(Erp_context);

    //   const userCart = useMemo(() => {
    //     if (!cart || !user) return [];
    //     return cart.filter(item => item["0"].user_id === user.id);
    //   }, [cart, user]);

    const handleDelete = (item: any) => {
        console.log('Delete item:', item);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Customer Cart Items</h2>
            <CartTable data={userCart} />
        </div>
    );
};

export default Carts;
