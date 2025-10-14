import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';

const TableFilter = ({ filters, setFilters, onClear }: any) => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2">
                <Input
                    placeholder="Customer Name"
                    className="flex-1"
                    value={filters.customer || ''}
                    onChange={e =>
                        setFilters({ ...filters, customer: e.target.value })
                    }
                />

                <Input
                    placeholder="Product Name"
                    className="flex-1"
                    value={filters.productName || ''}
                    onChange={e =>
                        setFilters({ ...filters, productName: e.target.value })
                    }
                />

                <Select
                    placeholder="Order Status"
                    className="flex-1"
                    value={filters.orderStatus || undefined}
                    onChange={val =>
                        setFilters({ ...filters, orderStatus: val })
                    }
                    allowClear
                >
                    <Select.Option value="Pending">Pending</Select.Option>
                    <Select.Option value="Delivered">Delivered</Select.Option>
                    <Select.Option value="Shipped">Shipped</Select.Option>
                    <Select.Option value="Cancelled">Cancelled</Select.Option>
                </Select>

                <Select
                    placeholder="Payment Method"
                    className="flex-1"
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

                <DatePicker.RangePicker
                    value={filters.dateRange || undefined}
                    onChange={(dates: any) => {
                        if (!dates) setFilters({ ...filters, dateRange: null });
                        else
                            setFilters({
                                ...filters,
                                dateRange: [moment(dates[0]), moment(dates[1])],
                            });
                    }}
                    className="
                flex-1 
                bg-white text-gray-900 
                border border-gray-300 
                rounded-md 
                px-3 py-2
                placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:placeholder-gray-400
            "
                />

                <div className="flex flex-row gap-2">
                    <Button
                        onClick={onClear}
                        className="
                    bg-gray-200 text-gray-900 
                    hover:bg-gray-300 
                    dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
                    px-4 py-2 rounded-md h-[38px]
                    transition-colors duration-200
                "
                    >
                        Clear filter
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TableFilter;
