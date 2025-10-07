import { Courier } from './Data_Type';

export const COURIERS: Courier[] = [
    {
        id: 'PATHAO',
        name: 'Pathao',
        logoColor: 'text-red-500',
        isRecommended: false,
        canConfigure: true,
    },
    {
        id: 'STEADFAST',
        name: 'SteadFast',
        logoColor: 'text-purple-500',
        isRecommended: true, // maybe recommended
        canConfigure: true,
    },
    {
        id: 'REDX',
        name: 'REDX',
        logoColor: 'text-red-700',
        isRecommended: false,
        canConfigure: true,
    },
    {
        id: 'PAPERFLY',
        name: 'Paperfly',
        logoColor: 'text-blue-500',
        isRecommended: false,
        canConfigure: true,
    },
];
