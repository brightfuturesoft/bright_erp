import { useState } from 'react';
import { Select, Typography } from 'antd';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Text } = Typography;
const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
    console.log(info?.source, value);

const TableController = () => {
    const [entriesCount, setEntriesCount] = useState(10);

    const handleChangeCount = (value: number) => {
        console.log(`selected ${value}`);
        setEntriesCount(value);
    };

    return (
        <div className="flex justify-between my-4">
            <div>
                <Text>Show </Text>
                <Select
                    defaultValue={entriesCount}
                    style={{ width: 60 }}
                    onChange={handleChangeCount}
                    options={[
                        { value: 10, label: '10' },
                        { value: 25, label: '25' },
                        { value: 50, label: '50' },
                        { value: 100, label: '100' },
                    ]}
                />
                <Text> entries</Text>
            </div>
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{ width: 200 }}
                />
            </div>
        </div>
    );
};

export default TableController;
