import { createApi } from "@reduxjs/toolkit/query/react";
import { Car } from "@/types/productTypes";
import { baseQuery } from "./baseApi";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Car[], void>({
      query: () => "products",
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    addProduct: builder.mutation<void, Car>({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useAddProductMutation,
} = productApi;
