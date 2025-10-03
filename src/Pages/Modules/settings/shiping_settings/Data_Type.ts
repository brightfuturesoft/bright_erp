export type CourierId = 'RX' | 'PATHAO' | 'STEADFAST' | 'REDX' | 'PAPERFLY';

export interface Courier {
    id: CourierId;
    name: string;
    logoColor: string;
    isRecommended: boolean;
    canConfigure: boolean;
}
