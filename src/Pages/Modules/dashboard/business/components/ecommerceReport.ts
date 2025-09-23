// utils/ecommerceReport.ts

export interface EcommerceOrder {
    _id: string;
    order_type: string;
    total_amount: number;
    created_at: string;
    order_number: string;
    [key: string]: any; // অন্য ডাটা থাকলেও সমস্যা হবে না
}

export interface EcommerceMonthlyReport {
    ordersMonthlyReport: {
        order_number: string;
        originalAmount: number;
        reducedAmount: number;
        progressPercent: number;
        monthsPassed: number;
    }[];
    totalOriginalAmount: number;
    totalReducedAmount: number;
    totalDiscountAmount: number;
    averageProgressPercent: number;
}

export function generateEcommerceMonthlyReport(
    orders: EcommerceOrder[],
    monthlyDiscountPercent: number = 10
): EcommerceMonthlyReport {
    if (!orders || orders.length === 0) {
        return {
            ordersMonthlyReport: [],
            totalOriginalAmount: 0,
            totalReducedAmount: 0,
            totalDiscountAmount: 0,
            averageProgressPercent: 0,
        };
    }

    const todayDate = new Date();

    const ordersMonthlyReport = orders.map(order => {
        const createdDate = order.created_at
            ? new Date(order.created_at)
            : new Date();

        // কত মাস পেরিয়েছে হিসাব
        let monthsPassed =
            (todayDate.getFullYear() - createdDate.getFullYear()) * 12 +
            (todayDate.getMonth() - createdDate.getMonth());

        if (monthsPassed > 12) monthsPassed = 12;
        if (monthsPassed < 0) monthsPassed = 0;

        // discount হিসাব
        const discountAmount =
            ((order.total_amount || 0) *
                (monthlyDiscountPercent * monthsPassed)) /
            100;

        const reducedAmount = (order.total_amount || 0) - discountAmount;

        const progressPercent = order.total_amount
            ? (discountAmount / order.total_amount) * 100
            : 0;

        return {
            order_number: order.order_number,
            originalAmount: order.total_amount,
            reducedAmount,
            progressPercent,
            monthsPassed,
        };
    });

    // টোটাল হিসাব
    const totalOriginalAmount = ordersMonthlyReport.reduce(
        (sum, o) => sum + o.originalAmount,
        0
    );
    const totalReducedAmount = ordersMonthlyReport.reduce(
        (sum, o) => sum + o.reducedAmount,
        0
    );
    const totalDiscountAmount = totalOriginalAmount - totalReducedAmount;
    const averageProgressPercent =
        ordersMonthlyReport.reduce((sum, o) => sum + o.progressPercent, 0) /
        ordersMonthlyReport.length;

    return {
        ordersMonthlyReport,
        totalOriginalAmount,
        totalReducedAmount,
        totalDiscountAmount,
        averageProgressPercent,
    };
}
