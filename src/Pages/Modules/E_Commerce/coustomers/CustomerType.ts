export interface Customer {
    photo: string;
    name: string;
    email: string;
    phone: string;
    customerSince: string;
    customerCode: string;
    customerType: string;
    customerStatus: 'Active' | 'Inactive';
}
