interface CategoryType {
    id: number;
    name: string;
    children?: CategoryType[];
}

export type { CategoryType };
