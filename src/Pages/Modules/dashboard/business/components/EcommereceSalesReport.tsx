import { useContext, useEffect, useState } from 'react';
import { Flex, Progress } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface EcommereceSalesReportProps {
    strokeWidth: number;
    strokeColor: string;
    trailColor: string;
}

const EcommereceSalesReport: React.FC<EcommereceSalesReportProps> = ({
    strokeWidth,
    strokeColor,
    trailColor,
}) => {
    const { user } = useContext(Erp_context);
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}ecommerce/orders/get-order`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user?._id || '',
                            workspace_id: user?.workspace_id || '',
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch orders');
                const data = await res.json();
                setOrders(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (isLoading) return <p>Loading...</p>;

    const totalReducedAmount = orders.reduce((acc, order) => {
        const discountAmount = order.discount || 0;
        return acc + ((order.total_amount || 0) - discountAmount);
    }, 0);
    const totalVATAmount = orders.reduce((acc, order) => {
        return acc + (order.tax_amount || 0);
    }, 0);
    const maxTarget = 1000000;
    const averageProgressPercent = parseFloat(
        Math.min((totalReducedAmount / maxTarget) * 100, 100).toFixed(2)
    );

    return (
        <div className="flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400">
            <div>
                <h1 className="font-[200] text-2xl dark:text-gray-300">
                    E-Commerce Sale
                </h1>
                <h1 className="text-gray-500 text-md">This Month</h1>
                <p className="mt-5 font-bold text-green-500">
                    Total:{' '}
                    <span className="text-red-500">{totalReducedAmount}</span>{' '}
                    BDT
                </p>
                <p className="mt-1 text-gray-500">
                    Total VAT:{' '}
                    <span className="text-blue-500">{totalVATAmount}</span> BDT
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

export default EcommereceSalesReport;
