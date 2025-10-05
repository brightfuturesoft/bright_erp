export const generatePosMonthlyReport = (
    orders,
    monthlyDiscountPercent = 10
) => {
    let totalOriginalAmount = 0;
    let totalReducedAmount = 0;
    let totalDiscountAmount = 0;
    const ordersMonthlyReport = (orders || []).map(order => {
        const createdDate = order.created_at
            ? new Date(order.created_at)
            : new Date();
        const todayDate = new Date();
        let monthsPassed =
            (todayDate.getFullYear() - createdDate.getFullYear()) * 12 +
            (todayDate.getMonth() - createdDate.getMonth());
        if (monthsPassed > 12) monthsPassed = 12;
        if (monthsPassed < 0) monthsPassed = 0;
        const originalAmount = order.total_amount || 0;
        const discountAmount =
            (originalAmount * monthlyDiscountPercent * monthsPassed) / 100;
        const reducedAmount = originalAmount - discountAmount;
        const progressPercent = originalAmount
            ? (discountAmount / originalAmount) * 100
            : 0;
        totalOriginalAmount += originalAmount;
        totalReducedAmount += reducedAmount;
        totalDiscountAmount += discountAmount;
        return {
            order_number: order.order_number,
            originalAmount,
            reducedAmount,
            progressPercent,
            monthsPassed,
        };
    });
    const averageProgressPercent = ordersMonthlyReport.length
        ? ordersMonthlyReport.reduce((sum, o) => sum + o.progressPercent, 0) /
          ordersMonthlyReport.length
        : 0;
    return {
        ordersMonthlyReport,
        totalOriginalAmount,
        totalReducedAmount,
        totalDiscountAmount,
        averageProgressPercent,
    };
};
