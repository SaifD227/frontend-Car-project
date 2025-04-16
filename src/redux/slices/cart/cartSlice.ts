import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "@/types/productTypes";

interface CartState {
  items: Car[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Car>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((car) => car._id !== action.payload);
    },
    setCart: (state, action: PayloadAction<Car[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
