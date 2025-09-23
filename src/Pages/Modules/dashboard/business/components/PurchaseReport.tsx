import { useContext, useEffect, useState } from 'react';
import { Flex, Progress } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface PurchaseReportProps {
    strokeWidth: number;
    strokeColor: string;
    trailColor: string;
}

const PurchaseReport: React.FC<PurchaseReportProps> = ({
    strokeWidth,
    strokeColor,
    trailColor,
}) => {
    const { user } = useContext(Erp_context);
    const [purchasingInfo, setPurchasingInfo] = useState({
        totalPurchaseAmount: 0,
        totalVATAmount: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}items/item/get-item`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user?._id,
                            workspace_id: user?.workspace_id,
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch items');
                const data = await res.json();
                const products = data.data.filter(
                    (item: any) => item.item_type === 'product'
                );
                let totalPurchase = 0;
                let totalVAT = 0;
                products.forEach((item: any) => {
                    const price = parseFloat(item.purchasing_price || 0);
                    const vatPercent = parseFloat(item.purchasing_vat || 0);
                    const vatAmount = (price * vatPercent) / 100;
                    totalVAT += vatAmount;
                    totalPurchase += price + vatAmount;
                });
                setPurchasingInfo({
                    totalPurchaseAmount: parseFloat(totalPurchase.toFixed(2)),
                    totalVATAmount: parseFloat(totalVAT.toFixed(2)),
                });
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, [user]);

    if (isLoading) return <p>Loading...</p>;

    const maxTarget = 1000000;
    const averageProgressPercent = parseFloat(
        Math.min(
            (purchasingInfo.totalPurchaseAmount / maxTarget) * 100,
            100
        ).toFixed(2)
    );

    return (
        <div className="flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400">
            <div>
                <h1 className="font-[200] text-2xl dark:text-gray-300">
                    Purchase Report
                </h1>
                <h1 className="text-gray-500 text-md">This Month</h1>
                <p className="mt-5 font-bold text-green-500">
                    Total:{' '}
                    <span className="text-red-500">
                        {purchasingInfo.totalPurchaseAmount}
                    </span>{' '}
                    BDT
                </p>
                <p className="mt-1 text-gray-500">
                    VAT Included:{' '}
                    <span className="text-blue-500">
                        {purchasingInfo.totalVATAmount}
                    </span>{' '}
                    BDT
                </p>
            </div>
            <Flex
                align="center"
                wrap
                gap={0}
            >
                <Progress
                    type="circle"
                    percent={averageProgressPercent}
                    size="default"
                    strokeWidth={strokeWidth}
                    strokeColor={strokeColor}
                    trailColor={trailColor}
                />
            </Flex>
        </div>
    );
};

export default PurchaseReport;
