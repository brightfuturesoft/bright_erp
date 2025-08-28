interface DataType {
    _id: string;
    name: string;
    code: string; // e.g. "#1677ff"
    status: 'active' | 'inactive';
    deleted?: boolean; // soft delete flag (true => deleted)
    createdAt?: string;
    updatedAt?: string;
}

export type { DataType };
