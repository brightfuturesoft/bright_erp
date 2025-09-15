// TableFilter.tsx
import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';

const TableFilter = ({ filters, setFilters, onClear, onApply }: any) => {
    return (
        <div className="flex flex-row flex-wrap items-center gap-3 my-3">
            <Input
                placeholder="Customer Name"
                className="flex-1 min-w-[150px]"
                value={filters.customer || ''}
                onChange={e =>
                    setFilters({ ...filters, customer: e.target.value })
                }
            />

            <Input
                placeholder="Product Name"
                className="flex-1 min-w-[150px]"
                value={filters.productName || ''}
                onChange={e =>
                    setFilters({ ...filters, productName: e.target.value })
                }
            />

            <Select
                placeholder="Order Status"
                className="flex-1 min-w-[150px]"
                value={filters.orderStatus || undefined}
                onChange={val => setFilters({ ...filters, orderStatus: val })}
                allowClear
            >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="delivered">Delivered</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
            </Select>

            <Select
                placeholder="Payment Status"
                className="flex-1 min-w-[150px]"
                value={filters.paymentStatus || undefined}
                onChange={val => setFilters({ ...filters, paymentStatus: val })}
                allowClear
            >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="paid">Paid</Select.Option>
                <Select.Option value="failed">Failed</Select.Option>
            </Select>

            <Select
                placeholder="Payment Method"
                className="flex-1 min-w-[150px]"
                value={filters.paymentMethod || undefined}
                onChange={val => setFilters({ ...filters, paymentMethod: val })}
                allowClear
            >
                <Select.Option value="cod">COD</Select.Option>
                <Select.Option value="bkash">Bkash</Select.Option>
                <Select.Option value="nagad">Nagad</Select.Option>
            </Select>

            <DatePicker.RangePicker
                className="flex-1 min-w-[200px]"
                value={filters.dateRange || undefined}
                onChange={(dates: any) => {
                    if (!dates) setFilters({ ...filters, dateRange: null });
                    else
                        setFilters({
                            ...filters,
                            dateRange: [moment(dates[0]), moment(dates[1])],
                        });
                }}
            />

            <div className="flex flex-row gap-2">
                <Button
                    type="primary"
                    onClick={onApply}
                >
                    Apply Filter
                </Button>
                <Button onClick={onClear}>Clear</Button>
            </div>
        </div>
    );
};

export default TableFilter;
