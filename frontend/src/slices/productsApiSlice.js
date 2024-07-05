import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const  productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        })
    }),
});

// invalidatesTags: ['Product'], stop the date to begin catch so that
// we can get the fresh data

export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation} = productsApiSlice;