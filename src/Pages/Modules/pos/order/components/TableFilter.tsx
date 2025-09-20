import { Button, DatePicker, Select } from 'antd';

const TableFilter = () => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2">
                {/* <Select
                    className="flex-1"
                    placeholder="Select Customer"
                >
                    <Select.Option value="customer1">Customer 1</Select.Option>
                    <Select.Option value="customer2">Customer 2</Select.Option>
                    <Select.Option value="customer3">Customer 3</Select.Option>
                </Select>
                <Select
                    className="flex-1"
                    placeholder="Order Status"
                >
                    <Select.Option value="order1">Order 1</Select.Option>
                    <Select.Option value="order2">Order 2</Select.Option>
                    <Select.Option value="order3">Order 3</Select.Option>
                </Select>
                <Select
                    className="flex-1"
                    placeholder="Delivery Status"
                >
                    <Select.Option value="delivery1">Delivery 1</Select.Option>
                    <Select.Option value="delivery2">Delivery 2</Select.Option>
                    <Select.Option value="delivery3">Delivery 3</Select.Option>
                </Select>
                <Select
                    className="flex-1"
                    placeholder="Invoice Status"
                >
                    <Select.Option value="invoice1">Invoice 1</Select.Option>
                    <Select.Option value="invoice2">Invoice 2</Select.Option>
                    <Select.Option value="invoice3">Invoice 3</Select.Option>
                </Select>
                <Select
                    className="flex-1"
                    placeholder="Select Range"
                >
                    <Select.Option value="range1">Range 1</Select.Option>
                    <Select.Option value="range2">Range 2</Select.Option>
                    <Select.Option value="range3">Range 3</Select.Option>
                </Select> */}
                <div className="flex-1">
                    <DatePicker.RangePicker
                        placeholder={['From date', 'To date']}
                        style={{ width: '100%' }}
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <Button type="primary">Apply filter</Button>
                    <Button>Clear filter</Button>
                </div>
            </div>
        </div>
    );
};

export default TableFilter;
