import { Button, DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';

interface TableFilterProps {
    filters: any;
    setFilters: (filters: any) => void;
    onApply?: () => void;
    onClear: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
    filters,
    setFilters,
    onApply,
    onClear,
}) => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2 flex-wrap">
                {/* Customer Name */}
                <Input
                    placeholder="Customer Name"
                    className="flex-1 min-w-[180px]"
                    value={filters.customer || ''}
                    onChange={e =>
                        setFilters({ ...filters, customer: e.target.value })
                    }
                />

                {/* Product Name */}
                <Input
                    placeholder="Product Name"
                    className="flex-1 min-w-[180px]"
                    value={filters.productName || ''}
                    onChange={e =>
                        setFilters({ ...filters, productName: e.target.value })
                    }
                />

                {/* Order Status */}
                <Select
                    placeholder="Order Status"
                    className="flex-1 min-w-[160px]"
                    value={filters.orderStatus || undefined}
                    onChange={val =>
                        setFilters({ ...filters, orderStatus: val })
                    }
                    allowClear
                >
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="delivered">Delivered</Select.Option>
                    <Select.Option value="cancelled">Cancelled</Select.Option>
                </Select>

                {/* Payment Status */}
                <Select
                    placeholder="Payment Status"
                    className="flex-1 min-w-[160px]"
                    value={filters.paymentStatus || undefined}
                    onChange={val =>
                        setFilters({ ...filters, paymentStatus: val })
                    }
                    allowClear
                >
                    <Select.Option value="pending">Pending</Select.Option>
                    <Select.Option value="paid">Paid</Select.Option>
                    <Select.Option value="failed">Failed</Select.Option>
                </Select>

                {/* Payment Method */}
                <Select
                    placeholder="Payment Method"
                    className="flex-1 min-w-[160px]"
                    value={filters.paymentMethod || undefined}
                    onChange={val =>
                        setFilters({ ...filters, paymentMethod: val })
                    }
                    allowClear
                >
                    <Select.Option value="cod">COD</Select.Option>
                    <Select.Option value="bkash">Bkash</Select.Option>
                    <Select.Option value="nagad">Nagad</Select.Option>
                </Select>

                {/* Date Range */}
                <DatePicker.RangePicker
                    className="flex-1 min-w-[220px]"
                    value={
                        filters.dateRange
                            ? [
                                  dayjs(filters.dateRange[0]),
                                  dayjs(filters.dateRange[1]),
                              ]
                            : undefined
                    }
                    onChange={dates => {
                        if (!dates) setFilters({ ...filters, dateRange: null });
                        else
                            setFilters({
                                ...filters,
                                dateRange: [dayjs(dates[0]), dayjs(dates[1])],
                            });
                    }}
                />

                {/* Buttons */}
                <div className="flex flex-row gap-2">
                    <Button
                        type="primary"
                        onClick={onApply}
                    >
                        Apply filter
                    </Button>
                    <Button onClick={onClear}>Clear filter</Button>
                </div>
            </div>
        </div>
    );
};

export default TableFilter;
