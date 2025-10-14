export interface ProductVariant {
    color?: string;
    size?: string;
    sku: string;
    quantity: number;
    normal_price: number;
    offer_price: number;
    product_cost: number;
    cover_photo: string[];
}

export interface ProductType {
    id: string;
    name: string;
    sku: string;
    main_price: number;
    campaign_price?: number;
    cover_photo: string[];
    variants?: ProductVariant[];
    stock?: number;
}

export interface PromotionType {
    _id?: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
    flash_sale: boolean;
    flash_date?: string[]; // start and end date
    banner: string;
    products: ProductType[];
    workspace_id: string;
    createdBy: string;
    created_at?: string;
    updatedAt?: string;
}
