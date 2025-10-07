// calculateTotals.ts
export const calculateTotals = values => {
    const items = values.items || [];
    let subtotal = 0;
    let totalDiscount = 0;
    let totalVat = 0;
    const updatedItems = items.map(item => {
        const qty = Number(item.quantity || 1);
        const price = Number(item.price || 0);
        const discountPercent = Number(item.discount || 0);
        const vatPercent = Number(item.vat || 0);
        const lineSubtotal = qty * price;
        const discountAmount = (lineSubtotal * discountPercent) / 100;
        const vatAmount = ((lineSubtotal - discountAmount) * vatPercent) / 100;
        const lineTotal = lineSubtotal - discountAmount + vatAmount;
        // Removed alert: if item_name is missing, we proceed, but subtotal/discount are calculated based on numbers.
        // if (!item?.item_name) {
        //   return alert("No data Found")
        // }
        subtotal += lineSubtotal;
        totalDiscount += discountAmount;
        totalVat += vatAmount;
        return {
            key: item.key,
            item_name: item.item_name,
            item_type: item.item_type,
            brand: item.brand,
            color: item.color,
            size: item.size,
            manufacture: item.manufacture,
            category: item.category,
            unit: item.unit,
            quantity: qty,
            price,
            discount: discountPercent,
            vat: vatPercent,
            stock: item.stock,
            subtotal: lineSubtotal,
            discount_amount: discountAmount,
            vat_amount: vatAmount,
            total: lineTotal,
        };
    });
    // Global discount
    let globalDiscountAmount = 0;
    const discountObj = values.global_discount || {};
    if (discountObj.value) {
        if (discountObj.type === 'percentage') {
            globalDiscountAmount = (subtotal * discountObj.value) / 100;
        } else {
            globalDiscountAmount = discountObj.value;
        }
    }
    // Adjustment calculation
    const adjustmentObj = values.adjustment || {};
    let adjustmentValue = 0;
    if (adjustmentObj.value) {
        adjustmentValue =
            adjustmentObj.operator === 'plus'
                ? Number(adjustmentObj.value)
                : -Number(adjustmentObj.value);
    }
    // Grand total with discount and adjustment
    const grandTotal =
        subtotal - globalDiscountAmount + totalVat + adjustmentValue; // Correction: Grand Total logic
    const paidAmount = Number(values.paid_amount || 0);
    const dueAmount = grandTotal - paidAmount;
    return {
        items: updatedItems,
        subtotal,
        total_discount: totalDiscount,
        total_vat: totalVat,
        global_discount: {
            ...discountObj,
            amount: globalDiscountAmount,
        },
        adjustment: {
            ...adjustmentObj,
            amount: adjustmentValue,
        },
        grand_total: grandTotal,
        paid_amount: paidAmount,
        due_amount: dueAmount < 0 ? 0 : dueAmount,
    };
};
