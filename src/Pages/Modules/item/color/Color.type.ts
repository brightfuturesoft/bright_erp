interface DataType {
    _id: string;
    color_name: string;
    code: string;
    status: 'active' | 'inactive';
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export type { DataType };
