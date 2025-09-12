import { Briefcase, LineChart, Plus } from 'lucide-react';

export default function OrdersSummary({ orders }: { orders: any[] }) {
    if (!orders || orders.length === 0) {
        return <p>No orders found</p>;
    }

    // সব order loop করে যোগফল বের করা
    const totals = orders.reduce(
        (acc, order) => {
            const subTotal =
                order.total_amount -
                order.tax_amount -
                order.shipping_charge +
                order.discount;
            acc.subTotalAmount += subTotal;
            acc.subTotalTax += order.tax_amount;
            acc.grandTotalAmount += order.total_amount;
            return acc;
        },
        { subTotalAmount: 0, subTotalTax: 0, grandTotalAmount: 0 }
    );

    return (
        <div className="flex flex-wrap gap-5">
            <InfoCard
                title="Sub Total Amount"
                amount={totals.subTotalAmount}
                icon={<Briefcase />}
            />
            <InfoCard
                title="Sub Total Tax"
                amount={totals.subTotalTax}
                icon={<LineChart />}
            />
            <InfoCard
                title="Grand Total Amount"
                amount={totals.grandTotalAmount}
                icon={<Plus />}
            />
        </div>
    );
}

// InfoCard component (যেটা তোর আগে থেকে আছে)
function InfoCard({
    title,
    amount,
    icon,
}: {
    title: string;
    amount: number;
    icon: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-start">
            <div className="flex items-center gap-2 text-gray-600">
                {icon}
                <span className="text-sm">{title}</span>
            </div>
            <div className="text-xl font-semibold mt-2">
                {amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })}
            </div>
        </div>
    );
}
