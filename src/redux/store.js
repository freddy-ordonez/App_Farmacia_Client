import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './sliceProduct';
import ClientReducer from './sliceClient'
import BillingReducer from './sliceBilling'
import UserReducer from './sliceUser'
import ShoppingCartReducer from "./sliceShoopingCart"
import LoginReducer from "./sliceLogin"

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    client: ClientReducer,
    user: UserReducer,
    billing: BillingReducer,
    cartShooping: ShoppingCartReducer,
    login: LoginReducer
  },
});

export default store;