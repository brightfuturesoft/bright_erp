// src/Pages/Modules/Cart/CustomerCarts.tsx
import { useState, useEffect } from 'react';
import moment from 'moment';
import Section from '../../common/components/Section';
import TableFilter from './components/TableFilter';
import DataTable from './components/DataTable';
import { useCartData } from './components/data_get_api';

const CustomerCarts = () => {
    const { cart } = useCartData();
    const [filters, setFilters] = useState<any>({});
    const [filteredCarts, setFilteredCarts] = useState<any[]>([]);

    // Normalize cart data
    const normalizedCart = cart?.map((item: any) => {
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
            return cartItem.products.some((p: any) => {
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

    return (
        <Section title="Customers Carts">
            <TableFilter
                filters={filters}
                setFilters={setFilters}
                onClear={handleClearFilter}
            />
            <DataTable data={filteredCarts} />
        </Section>
    );
};

export default CustomerCarts;
