import { useItemsData } from '@/Pages/Modules/item/items/components/data_get_api';
import { Flex, Progress } from 'antd';

const ItemDetails = () => {
    const { itemsData, isLoading } = useItemsData();
    if (isLoading) return <p>Loading...</p>;
    const totalItems = itemsData?.length || 0;
    const lowStockItems = itemsData?.filter(
        (item: any) => item.low_stock && parseInt(item.low_stock) > 0
    ).length;
    const allItemGroups = itemsData?.reduce((acc: any, item: any) => {
        item.categories?.forEach((cat: any) => {
            if (!acc.includes(cat.label)) acc.push(cat.label);
        });
        return acc;
    }, [] as string[]).length;
    const progressPercent = totalItems
        ? Math.min((lowStockItems / totalItems) * 100, 100)
        : 0;
    let strokeColor = '#52c41a';
    if (progressPercent >= 30 && progressPercent < 70) strokeColor = '#faad14';
    else if (progressPercent >= 70) strokeColor = '#f5222d';

    return (
        <div className="gap-2 dark:border-gray-700 grid md:grid-cols-2 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full">
            <div>
                <h4 className="font-semibold text-xl dark:text-gray-400">
                    ITEM DETAILS
                </h4>
                <ul>
                    <li className="flex justify-between items-center mb-3 w-full text-red-600">
                        <span>Low Stock Items</span>
                        <span>{lowStockItems}</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 w-full text-blue-600">
                        <span>All Active Items</span>
                        <span>{totalItems}</span>
                    </li>
                    <li className="flex justify-between items-center mb-3 w-full text-blue-600">
                        <span>All Item Groups</span>
                        <span>{allItemGroups}</span>
                    </li>
                </ul>
            </div>
            <div className="flex justify-center md:justify-end items-center mt-6 md:mt-0">
                <Flex
                    gap="large"
                    wrap
                >
                    <div className="stock-progress">
                        <Progress
                            type="dashboard"
                            percent={progressPercent}
                            strokeWidth={10}
                            strokeColor={strokeColor}
                            size={10}
                        />
                    </div>
                </Flex>
            </div>
        </div>
    );
};

export default ItemDetails;
