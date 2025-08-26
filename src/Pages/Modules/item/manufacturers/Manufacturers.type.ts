interface DataType {
    _id: string;
    manufacturer: string;
    code: string;
    description: string;
    discount: number | string;
    status: boolean | string;
}

export type { DataType };
