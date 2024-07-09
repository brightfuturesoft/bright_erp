import { CategoryType } from './Category.type';

// Function to generate a random number between 0 and 9
function getRandomNumber() {
    return Math.floor(Math.random() * 10);
}

// Function to generate a random LEGO avatar URL
function getRandomLegoAvatarUrl() {
    const randomNumber = getRandomNumber();
    return `https://randomuser.me/api/portraits/lego/${randomNumber}.jpg`;
}

const categories: CategoryType[] = [
    {
        id: 123,
        name: 'Battery',
        img: getRandomLegoAvatarUrl(),
        position: 1,
    },
    {
        id: 124,
        name: 'Charger',
        img: getRandomLegoAvatarUrl(),
        position: 2,
    },
    {
        id: 125,
        name: 'Mobile',
        img: getRandomLegoAvatarUrl(),
        position: 3,
        children: [
            {
                id: 1234,
                name: 'Samsung',
                img: getRandomLegoAvatarUrl(),
                position: 1,
                children: [
                    {
                        id: 12345,
                        name: 'A series',
                        img: getRandomLegoAvatarUrl(),
                        position: 1,
                    },
                    {
                        id: 12346,
                        name: 'S series',
                        img: getRandomLegoAvatarUrl(),
                        position: 2,
                    },
                    {
                        id: 12347,
                        name: 'F series',
                        img: getRandomLegoAvatarUrl(),
                        position: 3,
                    },
                    {
                        id: 12348,
                        name: 'Note series',
                        img: getRandomLegoAvatarUrl(),
                        position: 4,
                        children: [
                            {
                                id: 123456,
                                name: 'Note 10 series',
                                img: getRandomLegoAvatarUrl(),
                                position: 1,
                                children: [
                                    {
                                        id: 1234567,
                                        name: 'Single Sim',
                                        img: getRandomLegoAvatarUrl(),
                                        position: 1,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 12349,
                        name: 'Fold series',
                        img: getRandomLegoAvatarUrl(),
                        position: 5,
                    },
                ],
            },
            {
                id: 1235,
                name: 'Apple',
                img: getRandomLegoAvatarUrl(),
                position: 2,
            },
        ],
    },
    {
        id: 126,
        name: 'Laptop',
        img: getRandomLegoAvatarUrl(),
        position: 4,
    },
];
export { categories };
