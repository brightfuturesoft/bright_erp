import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';

const TableFilter = ({ filters, setFilters, onClear }: any) => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2">
                <Input
                    placeholder="Search by Order Number"
                    value={filters?.orderNumber || ''}
                    onChange={e =>
                        setFilters({ ...filters, orderNumber: e.target.value })
                    }
                    className="flex-1"
                />

                <Input
                    placeholder="Customer Name"
                    className="flex-1"
                    value={filters?.customer || ''}
                    onChange={e =>
                        setFilters({ ...filters, customer: e.target.value })
                    }
                />
                <Select
                    placeholder="Payment Method"
                    className="flex-1"
                    value={filters?.paymentMethod || undefined}
                    onChange={val =>
                        setFilters({ ...filters, paymentMethod: val })
                    }
                    allowClear
                >
                    <Select.Option value="cash">Cash</Select.Option>
                    <Select.Option value="card">Card</Select.Option>
                    <Select.Option value="bkash">Bkash</Select.Option>
                    <Select.Option value="nagad">Nagad</Select.Option>
                </Select>

                <DatePicker.RangePicker
                    className="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2"
                    popupClassName="dark:bg-gray-700 dark:text-white"
                    value={filters?.dateRange || undefined}
                    onChange={(dates: any) => {
                        if (!dates) setFilters({ ...filters, dateRange: null });
                        else
                            setFilters({
                                ...filters,
                                dateRange: [dates[0], dates[1]],
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
