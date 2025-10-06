// Possible courier IDs
export type CourierId = 'RX' | 'PATHAO' | 'STEADFAST' | 'REDX' | 'PAPERFLY';

// Courier object for CustomRadio etc.
export interface Courier {
    id: CourierId;
    name: string;
    logoColor: string; // Tailwind color class for logo
    isRecommended: boolean; // Recommended courier
    canConfigure: boolean; // Can configure API keys
    description?: string;
    logo?: string;
}

// Optional: if you need a separate type for API/fetch purposes
export interface CourierType {
    id: CourierId;
    name: string;
    description?: string;
    logo?: string;
    logoColor: string;
    isRecommended: boolean;
    canConfigure: boolean; // optional
}

// User info type (from context)
export interface UserType {
    _id: string;
    name: string;
    workspace_id: string;
    email?: string;
}

export interface IntegrateServicesProps {
    couriers: CourierType[];
    selectedCourier: CourierId;
    onSelectCourier: (id: CourierId) => void;

    // Steedfast props
    apiKey: string;
    setApiKey: (val: string) => void;
    apiSecret: string;
    setApiSecret: (val: string) => void;

    // Pathao props
    pathaoBaseUrl: string;
    setPathaoBaseUrl: (val: string) => void;
    pathaoClientId: string;
    setPathaoClientId: (val: string) => void;
    pathaoClientSecret: string;
    setPathaoClientSecret: (val: string) => void;

    // Common props
    user: any;
    fetchSettings: () => void;
}
