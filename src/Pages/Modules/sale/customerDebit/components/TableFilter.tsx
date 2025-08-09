import { Button, DatePicker, Select } from 'antd';

const TableFilter = () => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2">
                <Select
                    className="flex-1"
                    placeholder="Select Customer"
                >
                    <Select.Option value="customer1">Customer 1</Select.Option>
                    <Select.Option value="customer2">Customer 2</Select.Option>
                    <Select.Option value="customer3">Customer 3</Select.Option>
                </Select>
                <Select
                    className="flex-1"
                    placeholder="Return Status"
                >
                    <Select.Option value="order1">Approved</Select.Option>
                    <Select.Option value="order2">Cancelled</Select.Option>
                </Select>
                <Select
                    className="flex-1"
                    placeholder="Select Range"
                >
                    <Select.Option value="range1">Range 1</Select.Option>
                    <Select.Option value="range2">Range 2</Select.Option>
                    <Select.Option value="range3">Range 3</Select.Option>
                </Select>
                <div className="flex-1">
                    <DatePicker.RangePicker
                        placeholder={['From date', 'To date']}
                        style={{
                            width: '100%',
                            height: '40px',
                            padding: '20px 10px',
                        }}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <Button
                        type="primary"
                        className="bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white"
                    >
                        Apply filter
                    </Button>
                    <Button className="bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white">
                        Clear filter
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TableFilter;
