import { useCustomersData } from '@/Pages/Modules/E_Commerce/coustomers/components/data_get_api';
import { useOrdersData } from '@/Pages/Modules/E_Commerce/Order/components/data_get_api';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FilterAction from './FilterAction';
import CustomerShowcase from './CustomerShowcase';
import CustomerInformation from './CustomerInformation';
import Carts from '../ReletedInformation/carts/Carts';
import { useCartData } from '../ReletedInformation/carts/data_get_api';
import Wishlist from '../ReletedInformation/wishlist/Wishlist';
import { useWishlistData } from '@/Pages/Modules/E_Commerce/customer_wishlist/components/data_get_api';

const CustomersDetails = () => {
    const { id } = useParams();
    const { orders } = useOrdersData();
    const { cart } = useCartData();
    const { wishlist } = useWishlistData();
    const { customers: apiCustomers } = useCustomersData();
    const customer = apiCustomers?.find(c => c._id === id);
    const customerOrders = orders?.filter(o => o.user_id === id);
    const userCart = useMemo(() => {
        if (!cart || !id) return [];
        return cart.filter(item => item['0'].user_id === id);
    }, [cart, id]);

    const userWishlist = useMemo(() => {
        if (!wishlist || !id) return [];
        return wishlist.filter(item => item.user_id === id);
    }, [cart, id]);

    return (
        <div className="text-dark dark:text-light">
            <FilterAction />

            <CustomerShowcase
                orders={customerOrders}
                userCart={userCart}
            />

            <CustomerInformation customer={customer} />
            <Carts userCart={userCart} />
            <Wishlist userWishlist={userWishlist} />
        </div>
    );
};

export default CustomersDetails;
