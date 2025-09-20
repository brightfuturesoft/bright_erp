// src/Pages/Modules/Wishlist/CustomerWishlist.tsx
import { useState, useEffect } from 'react';
import Section from '../../common/components/Section';
import { useWishlistData } from './components/data_get_api';
import TableFilter from './components/Table_Filter';
import DataTable from './components/Wishlist_Data_Table';

const CustomerWishlist = () => {
    const { wishlist } = useWishlistData();
    const [filters, setFilters] = useState<any>({});
    const [filteredWishlist, setFilteredWishlist] = useState<any[]>([]);

    // Normalize wishlist data
    const normalizedWishlist = wishlist?.map((item: any) => {
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
            return wishlistItem.products.some((p: any) => {
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

    return (
        <Section title="Customers Wishlist">
            <TableFilter
                filters={filters}
                setFilters={setFilters}
                onClear={handleClearFilter}
            />
            <DataTable data={filteredWishlist} />
        </Section>
    );
};

export default CustomerWishlist;
