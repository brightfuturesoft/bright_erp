export const data = [
    {
        id: 1,
        name: 'Electronics',
        parentId: null,
        position: 1,
        imageUrl: 'https://example.com/images/electronics.jpg',
        isActive: true,
        categories: [
            {
                id: 2,
                name: 'Mobile Phones',
                parentId: 1,
                position: 1,
                imageUrl: 'https://example.com/images/mobile_phones.jpg',
                isActive: true,
                categories: [
                    {
                        id: 3,
                        name: 'Smartphones',
                        parentId: 2,
                        position: 1,
                        imageUrl: 'https://example.com/images/smartphones.jpg',
                        isActive: true,
                        categories: [
                            {
                                id: 11,
                                name: 'Android',
                                parentId: 3,
                                position: 1,
                                imageUrl:
                                    'https://example.com/images/android.jpg',
                                isActive: true,
                                categories: [],
                            },
                            {
                                id: 12,
                                name: 'iOS',
                                parentId: 3,
                                position: 2,
                                imageUrl: 'https://example.com/images/ios.jpg',
                                isActive: true,
                                categories: [],
                            },
                        ],
                    },
                    {
                        id: 4,
                        name: 'Feature Phones',
                        parentId: 2,
                        position: 2,
                        imageUrl:
                            'https://example.com/images/feature_phones.jpg',
                        isActive: true,
                        categories: [
                            {
                                id: 13,
                                name: 'Basic Phones',
                                parentId: 4,
                                position: 1,
                                imageUrl:
                                    'https://example.com/images/basic_phones.jpg',
                                isActive: true,
                                categories: [],
                            },
                            {
                                id: 14,
                                name: 'Senior Phones',
                                parentId: 4,
                                position: 2,
                                imageUrl:
                                    'https://example.com/images/senior_phones.jpg',
                                isActive: true,
                                categories: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: 5,
                name: 'Laptops',
                parentId: 1,
                position: 2,
                imageUrl: 'https://example.com/images/laptops.jpg',
                isActive: true,
                categories: [
                    {
                        id: 6,
                        name: 'Gaming Laptops',
                        parentId: 5,
                        position: 1,
                        imageUrl:
                            'https://example.com/images/gaming_laptops.jpg',
                        isActive: true,
                        categories: [],
                    },
                    {
                        id: 7,
                        name: 'Business Laptops',
                        parentId: 5,
                        position: 2,
                        imageUrl:
                            'https://example.com/images/business_laptops.jpg',
                        isActive: true,
                        categories: [],
                    },
                ],
            },
        ],
    },
    {
        id: 8,
        name: 'Home Appliances',
        parentId: null,
        position: 2,
        imageUrl: 'https://example.com/images/home_appliances.jpg',
        isActive: true,
        categories: [
            {
                id: 9,
                name: 'Refrigerators',
                parentId: 8,
                position: 1,
                imageUrl: 'https://example.com/images/refrigerators.jpg',
                isActive: true,
                categories: [],
            },
            {
                id: 10,
                name: 'Washing Machines',
                parentId: 8,
                position: 2,
                imageUrl: 'https://example.com/images/washing_machines.jpg',
                isActive: true,
                categories: [],
            },
        ],
    },
];
