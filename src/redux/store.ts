// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./slices/api/productApi";
import authReducer from "./slices/auth/authSlice";
import { authApi } from "./slices/api/authApi";
import cartReducer from "./slices/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});      

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
