import { Button, DatePicker, Input, Select } from 'antd';
import moment from 'moment';

const TableFilter = ({ filters, setFilters, onClear }: any) => {
    const handleGlobalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilters({ ...filters, globalSearch: value });
    };

    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <Input
                placeholder="Search order, customer, or product..."
                value={filters.globalSearch || ''}
                onChange={handleGlobalSearch}
                className="flex-1"
            />

            <Select
                placeholder="Payment Method"
                className="flex-1"
                value={filters.paymentMethod || undefined}
                onChange={val => setFilters({ ...filters, paymentMethod: val })}
                allowClear
            >
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Card</Select.Option>
                <Select.Option value="bkash">Bkash</Select.Option>
                <Select.Option value="nagad">Nagad</Select.Option>
            </Select>

            <DatePicker.RangePicker
                className="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600 h-[38px]"
                popupClassName="dark:!bg-gray-700 dark:!text-white"
                value={filters.dateRange || undefined}
                onChange={(dates: any) => {
                    if (!dates) setFilters({ ...filters, dateRange: null });
                    else
                        setFilters({
                            ...filters,
                            dateRange: [
                                moment(dates[0]).startOf('day'),
                                moment(dates[1]).endOf('day'),
                            ],
                        });
                }}
            />

            <Button
                className="h-[38px]"
                onClick={onClear}
            >
                Clear filter
            </Button>
        </div>
    );
};

export default TableFilter;
