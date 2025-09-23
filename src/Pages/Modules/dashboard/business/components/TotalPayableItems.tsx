import { useContext, useEffect, useState } from 'react';
import pay from '../../../../../assets/icons/pay.png';
import { Erp_context } from '@/provider/ErpContext';
import dayjs from 'dayjs';

const TotalPayableItems = () => {
    const { user } = useContext(Erp_context);
    const [ecommerceOrders, setEcommerceOrders] = useState<any[]>([]);
    const [posOrders, setPosOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch E-Commerce Orders
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
                setEcommerceOrders(data.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [user]);

    // Fetch POS Orders
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

    // Get current month start and end
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');

    // Filter current month orders
    const currentMonthEcom = ecommerceOrders.filter(order => {
        const createdAt = dayjs(order.created_at || order.createAt);
        return (
            createdAt.isAfter(startOfMonth) && createdAt.isBefore(endOfMonth)
        );
    });

    const currentMonthPos = posOrders.filter(order => {
        const createdAt = dayjs(order.created_at || order.createAt);
        return (
            createdAt.isAfter(startOfMonth) && createdAt.isBefore(endOfMonth)
        );
    });

    // Calculate totals
    const totalCurrentMonth = [...currentMonthEcom, ...currentMonthPos].reduce(
        (acc, order) =>
            acc + (order.total_amount || 0) + (order.tax_amount || 0),
        0
    );

    const totalOverdue = [
        ...ecommerceOrders.filter(order => !currentMonthEcom.includes(order)),
        ...posOrders.filter(order => !currentMonthPos.includes(order)),
    ].reduce(
        (acc, order) =>
            acc + (order.total_amount || 0) + (order.tax_amount || 0),
        0
    );

    return (
        <div className="dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-semibold text-dark text-xl dark:text-gray-400">
                        TOTAL PAYABLES
                    </h4>
                    <p className="text-dark dark:text-gray-500">
                        <span className="kalpurush-font text-lg">৳ </span>{' '}
                        {(totalCurrentMonth + totalOverdue).toLocaleString(
                            'en-US',
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }
                        )}
                    </p>
                </div>
                <div>
                    <img
                        src={pay}
                        alt="Pay Icon"
                        className="w-16 md:w-auto"
                    />
                </div>
            </div>
            <div className="md:flex justify-between items-center border-gray-700 mt-5 p-2 border rounded text-dark dark:text-gray-400 overflow-hidden">
                <div className="md:w-1/2">
                    <h3 className="text-xl dark:text-gray-400">
                        <p className="text-sm">
                            Current ( <small>This Month</small> )
                        </p>
                        <p>
                            <span className="kalpurush-font text-lg">৳ </span>
                            {totalCurrentMonth.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </h3>
                </div>
                <div className="md:float-end mt-4 md:mt-0 md:w-1/2 md:text-end">
                    <h3 className="text-xl dark:text-gray-400">
                        <p className="text-sm">
                            Overdue ( <small>Previous Months</small> )
                        </p>
                        <p>
                            <span className="kalpurush-font text-lg">৳ </span>
                            {totalOverdue.toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default TotalPayableItems;
