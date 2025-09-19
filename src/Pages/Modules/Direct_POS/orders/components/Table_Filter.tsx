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

                {/* <Input
                    placeholder="Product Name"
                    className="flex-1"
                    value={filters.productName || ''}
                    onChange={e =>
                        setFilters({ ...filters, productName: e.target.value })
                    }
                /> */}

                {/* <Select
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
                </Select> */}

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
                    className="flex-1"
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
                    <Button onClick={onClear}>Clear filter</Button>
                </div>
            </div>
        </div>
    );
};

export default TableFilter;
