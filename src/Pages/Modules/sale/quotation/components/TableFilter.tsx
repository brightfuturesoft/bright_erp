import { Button, DatePicker, Select } from 'antd';

const TableFilter = () => {
    return (
        <div className="flex flex-row items-center gap-5 my-3">
            <div className="flex flex-row flex-1 items-center gap-2">
                <Select
                    defaultValue="Option1"
                    className="flex-1"
                >
                    <Select.Option value="Option1">Option1</Select.Option>
                    <Select.Option value="Option2">Option2</Select.Option>
                    <Select.Option value="Option3">Option3</Select.Option>
                </Select>
                <Select
                    defaultValue="Option1"
                    className="flex-1"
                >
                    <Select.Option value="Option1">Option1</Select.Option>
                    <Select.Option value="Option2">Option2</Select.Option>
                    <Select.Option value="Option3">Option3</Select.Option>
                </Select>
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
