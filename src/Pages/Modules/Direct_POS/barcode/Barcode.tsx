import { Radio, Spin } from 'antd';
import { Boxes, Package } from 'lucide-react';
import Section from '../../common/components/Section';
import InfoCard from '../../common/components/InfoCard';
import { useState, useEffect } from 'react';
import ProductTable from './components/Product_Table';
import ProductFilter from './components/Table_Filter';
import { useItemsData } from './components/data_get_api';

const BarcodePage = () => {
    const { itemsData: products, isLoading, refetch } = useItemsData();
    const [filters, setFilters] = useState<any>({});
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

    useEffect(() => {
        if (!products) return;

        const filtered = products.filter(product => {
            return (
                (!filters.productName ||
                    product.item_name
                        ?.toLowerCase()
                        .includes(filters.productName.toLowerCase())) &&
                (!filters.sku ||
                    product.sku
                        ?.toLowerCase()
                        .includes(filters.sku.toLowerCase())) &&
                (!filters.brand ||
                    product.brand?.label
                        ?.toLowerCase()
                        .includes(filters.brand.toLowerCase())) &&
                (!filters.category ||
                    product.categories?.some((c: any) =>
                        c.label
                            .toLowerCase()
                            .includes(filters.category.toLowerCase())
                    )) &&
                (!filters.status ||
                    product.status
                        ?.toLowerCase()
                        .includes(filters.status.toLowerCase()))
            );
        });

        setFilteredProducts(filtered);
    }, [products, filters]);

    const handleClearFilter = () => {
        setFilters({});
    };

    const totals = (
        filteredProducts.length ? filteredProducts : products
    )?.reduce(
        (acc, product) => {
            const totalQty = product.variants?.reduce(
                (sum: number, v: any) => sum + (v.quantity || 0),
                0
            );
            acc.totalVariants += product.variants?.length || 0;
            acc.totalStock += totalQty || 0;
            return acc;
        },
        { totalVariants: 0, totalStock: 0 }
    );

    const expandedProducts = (
        filteredProducts.length ? filteredProducts : products
    )?.flatMap(product => {
        if (product.variants?.length) {
            return product.variants?.map(variant => ({
                ...product,
                variant_sku: variant.sku,
                variant_color: variant.color,
                variant_size: variant.size,
                variant_quantity: variant.quantity,
                variant_normal_price: variant.normal_price,
                variant_offer_price: variant.offer_price,
                variant_product_cost: variant.product_cost,
                variant_cover_photo: variant.cover_photo?.[0] || '',
            }));
        } else {
            return [{ ...product }];
        }
    });

    return (
        <Section title="Products">
            <div className="flex flex-wrap gap-5">
                <InfoCard
                    title="Total Variants"
                    amount={totals?.totalVariants}
                />
                <InfoCard
                    title="Total Stock"
                    amount={totals?.totalStock}
                />
            </div>

            <div className="flex items-center gap-3 my-3">
                <p>Product Type : </p>
                <Radio.Group
                    defaultValue="All"
                    buttonStyle="solid"
                >
                    <Radio.Button value="All">All</Radio.Button>
                    <Radio.Button value="Saleable">Saleable</Radio.Button>
                    <Radio.Button value="Purchasable">Purchasable</Radio.Button>
                </Radio.Group>
            </div>

            <ProductFilter
                filters={filters}
                setFilters={setFilters}
                onClear={handleClearFilter}
            />

            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <Spin
                        size="large"
                        tip="Loading products..."
                    />
                </div>
            ) : (
                <ProductTable data={expandedProducts} />
            )}
        </Section>
    );
};

export default BarcodePage;
