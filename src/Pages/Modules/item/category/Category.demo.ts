import { CategoryType } from './Category.type';

const categories: CategoryType[] = [
    {
        id: 123,
        name: 'Battery',
    },
    {
        id: 124,
        name: 'Charger',
    },
    {
        id: 125,
        name: 'Mobile',
        children: [
            {
                id: 1234,
                name: 'Samsung',
                children: [
                    {
                        id: 12345,
                        name: 'A series',
                    },
                    {
                        id: 12346,
                        name: 'S series',
                    },
                    {
                        id: 12347,
                        name: 'F series',
                    },
                    {
                        id: 12348,
                        name: 'Note series',
                        children: [
                            {
                                id: 123456,
                                name: 'Note 10 series',
                                children: [
                                    {
                                        id: 1234567,
                                        name: 'Single Sim',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 12349,
                        name: 'Fold series',
                    },
                ],
            },
            {
                id: 1235,
                name: 'Apple',
            },
        ],
    },
    {
        id: 126,
        name: 'Laptop',
    },
];

export { categories };
