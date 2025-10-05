import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// src/Pages/Modules/Wishlist/CustomerWishlist.tsx
import { useState, useEffect } from 'react';
import Section from '../../common/components/Section';
import { useWishlistData } from './components/data_get_api';
import TableFilter from './components/Table_Filter';
import DataTable from './components/Wishlist_Data_Table';
const CustomerWishlist = () => {
    const { wishlist } = useWishlistData();
    const [filters, setFilters] = useState({});
    const [filteredWishlist, setFilteredWishlist] = useState([]);
    // Normalize wishlist data
    const normalizedWishlist = wishlist?.map(item => {
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
        if (!normalizedWishlist) return;
        const filtered = normalizedWishlist.filter(wishlistItem => {
            return wishlistItem.products.some(p => {
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
        setFilteredWishlist(filtered);
    }, [filters, normalizedWishlist]);
    const handleClearFilter = () => setFilters({});
    return _jsxs(Section, {
        title: 'Customers Wishlist',
        children: [
            _jsx(TableFilter, {
                filters: filters,
                setFilters: setFilters,
                onClear: handleClearFilter,
            }),
            _jsx(DataTable, { data: filteredWishlist }),
        ],
    });
};
export default CustomerWishlist;
