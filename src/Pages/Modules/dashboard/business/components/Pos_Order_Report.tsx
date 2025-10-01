import { useContext, useEffect, useState } from 'react';
import { Flex, Progress } from 'antd';
import { Erp_context } from '@/provider/ErpContext';

interface PosOrderReportProps {
    strokeWidth: number;
    strokeColor: string;
    trailColor: string;
}

const Pos_Order_Report: React.FC<PosOrderReportProps> = ({
    strokeWidth,
    strokeColor,
    trailColor,
}) => {
    const { user } = useContext(Erp_context);
    const [posOrders, setPosOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosOrders = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URL}direct-pos/orders/get-orders`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: user?._id || '',
                            workspace_id: user?.workspace_id || '',
                        },
                    }
                );
                if (!res.ok) throw new Error('Failed to fetch POS orders');
                const data = await res.json();
                setPosOrders(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosOrders();
    }, [user]);

    if (isLoading) return <p>Loading...</p>;
    const totalAmount = posOrders.reduce((acc, order) => {
        const discount = order.discount || 0;
        return acc + ((order.total_amount || 0) - discount);
    }, 0);

    const totalVAT = posOrders.reduce(
        (acc, order) => acc + (order.tax_amount || 0),
        0
    );
    const totalWithTax = totalAmount + totalVAT;
    const maxTarget = 1000000;
    const progressPercent = parseFloat(
        Math.min((totalWithTax / maxTarget) * 100, 100).toFixed(2)
    );

    return (
        <div className="flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400">
            <div>
                <h1 className="font-[200] text-2xl dark:text-gray-300">
                    POS Sale
                </h1>
                <h1 className="text-gray-500 text-md">This Month</h1>
                <p className="mt-5 font-bold text-green-500">
                    Total: <span className="text-red-500">{totalAmount}</span>{' '}
                    BDT
                </p>
                <p className="mt-1 text-gray-500">
                    Total VAT: <span className="text-blue-500">{totalVAT}</span>{' '}
                    BDT
                </p>
                <p className="mt-1 font-semibold">
                    Total (Including VAT):{' '}
                    <span className="text-purple-500">{totalWithTax}</span> BDT
                </p>
            </div>
            <Flex
                align="center"
                wrap
                gap={0}
            >
                <Progress
                    type="circle"
                    percent={progressPercent}
                    size="default"
                    strokeWidth={strokeWidth}
                    strokeColor={strokeColor}
                    trailColor={trailColor}
                />
            </Flex>
        </div>
    );
};

export default Pos_Order_Report;
