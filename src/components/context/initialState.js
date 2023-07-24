import { fetchUser, fetchCart } from "../../utils/fetchLocalStorageData"
export const initialState = {
    user: fetchUser(),
    foodItems: null,
    cartShow: false,
    cartItems: fetchCart() === undefined ? [] : fetchCart()
}