import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store.tsx";

export interface stockReducer {
  id: string;
  quantity: number;
}

export interface ProductType {
  quantity: number;
  title: string;
  description: string;
  id: string;
  image: string;
  price: number;
}

export interface CartState {
  items: string[];
  products: ProductType[];
}

export const initialState: CartState = {
  items: [],
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.items = [...state.items, action.payload];
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item !== action.payload);
    },
    reduceBasket(state, action: PayloadAction<stockReducer>) {
      state.items = state.items.filter((item) => item !== action.payload.id);
      for (let i = 0; i < action.payload.quantity; ++i) {
        state.items.push(action.payload.id);
      }
    },
    setProducts(state, action: PayloadAction<ProductType[]>) {
      state.products = action.payload;
    },
    emptyCart(state, action: PayloadAction<null>) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, setProducts, reduceBasket, emptyCart } =
  cartSlice.actions;

export const selectItems = (state: RootState) => state.cart.items;
export const selectProducts = (state: RootState) => state.cart.products;

export default cartSlice.reducer;
