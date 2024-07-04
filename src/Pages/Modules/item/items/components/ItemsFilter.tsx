import { Button, Select, Typography } from 'antd';
const { Text } = Typography;

const ItemsFilter = () => {
    // const [availability, setAvailability] = useState('');
    const handleAvailabilityChange = (value: string) => {
        console.log('Availability changed:', value);
    };

    const handleItemTypeChange = (value: string) => {
        console.log('Item Type changed:', value);
    };

    const handleBrandChange = (value: string) => {
        console.log('Brand changed:', value);
    };

    const handleStatusChange = (value: string) => {
        console.log('Status changed:', value);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex lg:flex-row flex-col gap-2">
                <div className="flex flex-col flex-1">
                    <Text
                        strong
                        className="text-black dark:text-white"
                    >
                        Categories
                    </Text>
                    <Select
                        showSearch
                        placeholder="Select Item Categories"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            { value: '1', label: 'Jack' },
                            { value: '2', label: 'Lucy' },
                            { value: '3', label: 'Tom' },
                        ]}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <Text
                        strong
                        className="text-black dark:text-white"
                    >
                        Available in
                    </Text>
                    <Select
                        placeholder="ex: Pos, Ecommerce"
                        onChange={handleAvailabilityChange}
                        options={[
                            { value: 'pos', label: 'POS' },
                            { value: 'ecommerce', label: 'Ecommerce' },
                        ]}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <Text
                        strong
                        className="text-black dark:text-white"
                    >
                        Item Type
                    </Text>
                    <Select
                        placeholder="ex: Product, Service"
                        onChange={handleItemTypeChange}
                        options={[
                            { value: 'product', label: 'Product' },
                            { value: 'services', label: 'Servicesf' },
                        ]}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <Text
                        strong
                        className="text-black dark:text-white"
                    >
                        Brand
                    </Text>
                    <Select
                        placeholder="ex: Apple, Samsung"
                        onChange={handleBrandChange}
                        options={[
                            { value: 'apple', label: 'Apple' },
                            { value: 'samsung', label: 'Samsung' },
                            { value: 'huawei', label: 'Huawei' },
                            { value: 'xiaomi', label: 'Xiaomi' },
                            { value: 'oneplus', label: 'OnePlus' },
                            { value: 'oppo', label: 'OPPO' },
                            { value: 'vivo', label: 'Vivo' },
                            { value: 'htc', label: 'HTC' },
                            { value: 'motorola', label: 'Motorola' },
                            { value: 'sony', label: 'Sony' },
                        ]}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <Text
                        strong
                        className="text-black dark:text-white"
                    >
                        Status
                    </Text>
                    <Select
                        placeholder="ex: Active, Inactive"
                        onChange={handleStatusChange}
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <Button type="primary">Apply Filter</Button>
                <Button>Clear Filter</Button>
            </div>
        </div>
    );
};

export default ItemsFilter;
