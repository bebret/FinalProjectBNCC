export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    phone?: string;
    createdAt: string;
    updatedAt: string;
}