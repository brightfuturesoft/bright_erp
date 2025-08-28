export const createItemPayload = (values: any) => {
    const code = `${values.item_name}${Date.now().toString().slice(-4)}`;

    return {
        item_type: values.item_type,
        item_name: values.item_name,
        item_description: values.item_description || '',
        item_long_description: values.item_long_description || '',
        is_returnable: values.is_returnable || false,
        sku: values.item_type === 'product' ? values.sku || '' : '',
        unit: values.item_type === 'product' ? values.unit || '' : 'N/A',
        manufacturer:
            values.item_type === 'product' ? values.manufacturer || '' : '',
        brand: values.item_type === 'product' ? values.brand || '' : '',
        color: values.item_type === 'product' ? values.color || '' : '',
        size: values.item_type === 'product' ? values.size || '' : '',
        is_purchasable:
            values.item_type === 'product'
                ? values.is_purchasable || false
                : false,
        purchasing_price: values.purchasing_price || 0,
        purchasing_account: values.purchasing_account || '',
        purchasing_vat: values.purchasing_vat || '',
        is_saleable: values.is_saleable || false,
        selling_price: values.selling_price || 0,
        item_weight:
            values.item_type === 'product' && (values.item_weight || '0'),
        sales_account:
            values.item_type === 'product' && (values.sales_account || ''),
        selling_vat: values.selling_vat || '',
        selling_discount: values.selling_discount || '',
        attribute_sets:
            values.item_type === 'product' ? values.attribute_sets || [] : [],
        categories: values.categories || [],
        is_track_inventory:
            values.item_type === 'product'
                ? values.is_track_inventory || false
                : false,
        inventory_account: values.inventory_account || '',
        low_stock: values.low_stock || 0,
        is_serialized: values.is_serialized || false,
        is_manage_batch: values.is_manage_batch || false,
        attachments: values.attachments || [],
        status: values.status || 'Active',
        code: code,
    };
};

// "items/item/create-item'"
