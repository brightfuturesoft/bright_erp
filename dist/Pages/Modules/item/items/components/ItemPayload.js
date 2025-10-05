export const createItemPayload = values => {
    const code = `${values.item_name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')}-${Date.now().toString().slice(-4)}`;
    return {
        item_type: values.item_type,
        item_name: values.item_name,
        item_description: values.item_description || '',
        item_long_description: values.item_long_description || '',
        is_returnable: values.is_returnable || false,
        availeablein_pos: values.availeablein_pos || false,
        availeablein_ecommerce: values.availeablein_ecommerce || false,
        sku: values.sku || '',
        unit: values.item_type === 'product' ? values.unit || '' : 'N/A',
        handaling_price:
            values.item_type === 'product' ? values.handaling_price || 0 : 0,
        manufacturer:
            values.item_type === 'product' ? values.manufacturer || [] : [],
        brand: values.item_type === 'product' ? values.brand || [] : [],
        is_purchasable:
            values.item_type === 'product'
                ? values.is_purchasable || false
                : false,
        purchasing_price: values.purchasing_price || 0,
        purchasing_account: values.purchasing_account || '',
        purchasing_vat: values.purchasing_vat || '',
        is_saleable: values.is_saleable || true,
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
        stock_quantites: values.stock_quantites || '',
        low_stock: values.low_stock || '0',
        is_serialized: values.is_serialized || false,
        is_manage_batch: values.is_manage_batch || false,
        attachments: values.attachments || [],
        status: values.status || 'Active',
        code: code,
        variants:
            values.item_type === 'product'
                ? values.variants?.map(v => ({
                      color: v.color || values.color || '',
                      size: v.size || values.size || '',
                      sku: v.sku || values.sku || '',
                      quantity: v.quantity || 0,
                      normal_price: v.normal_price || 0,
                      offer_price: v.offer_price || 0,
                      product_cost: v.product_cost || 0,
                      cover_photo: v.cover_photo
                          ? Array.isArray(v.cover_photo)
                              ? v.cover_photo
                              : [v.cover_photo]
                          : [],
                  })) || [
                      {
                          color: values.color || '',
                          size: values.size || '',
                          sku: values.sku || '',
                          quantity: 0,
                          normal_price: 0,
                          offer_price: 0,
                          product_cost: 0,
                          cover_photo: values.cover_photo
                              ? Array.isArray(values.cover_photo)
                                  ? values.cover_photo
                                  : [values.cover_photo]
                              : [],
                      },
                  ]
                : [],
    };
};
