import { useContext, useState } from 'react';
import { Spin } from 'antd';
import TableController from '../../common/components/TableController';
import StockCard from '../../common/components/StockCard';
import { Briefcase, LineChart, Percent, Plus } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import TableFilter from './components/TableFilter';
import { SaleDataType } from './DirectSale.type';
import Section from '../../common/components/Section';
import DirectSaleTable from './components/DataTable';
import { HeaderComponent } from './components';

const DirectSale = () => {
    const { user } = useContext(Erp_context);
    const [searchValue, setSearchValue] = useState('');
    const [filteredSales, setFilteredSales] = useState<SaleDataType[]>([]);

    // 🔹 Fetch sales data
    const {
        data: saleData,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['directSaleData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}sale/direct_sale/get-direct-sales`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch direct sale data');
            const result = await res.json();
            return result.data as SaleDataType[];
        },
    });

    const majorSalesInfo =
        (filteredSales.length ? filteredSales : saleData)?.map(sale => ({
            _id: sale._id,
            order_number: sale.order_number,
            order_status: sale.order_status,
            subtotal: sale.subtotal,
            total_discount: sale.total_discount,
            total_vat: sale.total_vat,
            grand_total: sale.grand_total,
            paid_amount: sale.paid_amount,
            due_amount: sale.due_amount,
            customer_name: sale.customer?.name,
            customer_phone: sale.customer?.phone,
            customer_email: sale.customer?.email,
            sales_person: sale.sales_person?.name,
            created_at: sale.createAt,
            items: sale?.items?.map(item => ({
                item_name: item.item_name,
                brand: item.brand,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.subtotal,
                discount: item.discount,
                vat: item.vat,
                total: item.total,
            })),
        })) || [];

    // 🔹 Calculate totals (based on filtered or all sales)
    const totalSubtotal = Number(
        majorSalesInfo.reduce((sum, s) => sum + (s.subtotal || 0), 0).toFixed(2)
    );
    const totalVat = Number(
        majorSalesInfo
            .reduce((sum, s) => sum + (s.total_vat || 0), 0)
            .toFixed(2)
    );
    const totalDiscount = Number(
        majorSalesInfo
            .reduce((sum, s) => sum + (s.total_discount || 0), 0)
            .toFixed(2)
    );
    const grandTotal = Number(
        majorSalesInfo
            .reduce((sum, s) => sum + (s.grand_total || 0), 0)
            .toFixed(2)
    );

    // 🔹 Search filter (order/customer wise search)
    const salesToShow = majorSalesInfo.filter(
        s =>
            s.customer_name
                ?.toLowerCase()
                .includes(searchValue.toLowerCase()) ||
            s.order_number?.toLowerCase().includes(searchValue.toLowerCase()) ||
            s.sales_person?.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Spin
            spinning={isLoading}
            tip="Loading Direct Sales..."
        >
            <Section
                title="Direct Sales"
                sideComponent={<HeaderComponent />}
            >
                {/* Summary Cards */}
                <div className="flex flex-wrap gap-5 mb-5">
                    <StockCard
                        title="Sub Total Amount"
                        amount={totalSubtotal}
                        icon={<Briefcase />}
                    />
                    <StockCard
                        title="Sub Tax Amount"
                        amount={totalVat}
                        icon={<LineChart />}
                    />
                    <StockCard
                        title="Total Discount Amount"
                        amount={totalDiscount}
                        icon={<Percent />}
                    />
                    <StockCard
                        title="Grand Total Amount"
                        amount={grandTotal}
                        icon={<Plus />}
                    />
                </div>

                {/* Search & Filter */}
                <TableController
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <TableFilter
                    saleData={saleData || []}
                    onFilterChange={setFilteredSales}
                />

                {/* Table */}
                <DirectSaleTable
                    refetch={refetch}
                    tableData={salesToShow}
                />
            </Section>
        </Spin>
    );
};

export default DirectSale;
