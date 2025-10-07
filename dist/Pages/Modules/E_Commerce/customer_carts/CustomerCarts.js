import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// src/Pages/Modules/Cart/CustomerCarts.tsx
import { useState, useEffect } from 'react';
import Section from '../../common/components/Section';
import TableFilter from './components/TableFilter';
import DataTable from './components/DataTable';
import { useCartData } from './components/data_get_api';
const CustomerCarts = () => {
    const { cart } = useCartData();
    const [filters, setFilters] = useState({});
    const [filteredCarts, setFilteredCarts] = useState([]);
    // Normalize cart data
    const normalizedCart = cart?.map(item => {
        const products = Object.keys(item)
            .filter(k => !['_id', 'user_id', 'workspace_id'].includes(k))
            .map(k => item[k]);
        return {
            _id: item._id,
            user_id: item.user_id,
            workspace_id: item.workspace_id,
            products,
        };
    });
    // Apply filters
    useEffect(() => {
        if (!normalizedCart) return;
        const filtered = normalizedCart.filter(cartItem => {
            return cartItem.products.some(p => {
                const matchCustomer =
                    !filters.customer ||
                    p.user_name
                        .toLowerCase()
                        .includes(filters.customer.toLowerCase());
                const matchProduct =
                    !filters.productName ||
                    p.product_name
                        .toLowerCase()
                        .includes(filters.productName.toLowerCase());
                return matchCustomer && matchProduct;
            });
        });
        setFilteredCarts(filtered);
    }, [filters, normalizedCart]);
    const handleClearFilter = () => setFilters({});
    return _jsxs(Section, {
        title: 'Customers Carts',
        children: [
            _jsx(TableFilter, {
                filters: filters,
                setFilters: setFilters,
                onClear: handleClearFilter,
            }),
            _jsx(DataTable, { data: filteredCarts }),
        ],
    });
};
export default CustomerCarts;
