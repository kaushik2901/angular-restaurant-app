import { MyCartItem } from './userState';

export interface CartResponse {
    success: boolean,
    data: {
        [_id: string]: MyCartItem,
    }
    error: string | null,
}