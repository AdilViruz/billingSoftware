// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/localStorage";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-server-ksn.onrender.com/api/product/",
    // baseUrl: "http://localhost:8000/api/product/",
    prepareHeaders: (headers, { getState }) => {
      const currentToken = getToken();
      const access_token = currentToken ? currentToken : getState().auth.token;
      if (!headers.has("Authorization") && access_token) {
        headers.set("Authorization", `${access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["products"],
  endpoints: (build) => ({
    addBuildProducts: build.mutation({
      query(body) {
        return {
          url: `add-build-products`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    getBuildProducts: build.query({
      query(branch) {
        return {
          url: `build-products/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    getSingleBuildProducts: build.query({
      query(param) {
        const { branch, id } = param;

        return {
          url: `single-build-products/${branch}/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    updateBuildProducts: build.mutation({
      query({ id, ...rest }) {
        return {
          url: `build-products/${id}`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteBuildProducts: build.mutation({
      query(id) {
        return {
          url: `delete-build-products/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),

    addSoldProducts: build.mutation({
      query(body) {
        return {
          url: `add-sold-products`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    getSoldProducts: build.query({
      query(branch) {
        return {
          url: `sold-products/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    getSingleSoldProducts: build.query({
      query(param) {
        const { branch, id } = param;

        return {
          url: `single-sold-products/${branch}/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    updateSoldProducts: build.mutation({
      query({ id, ...rest }) {
        return {
          url: `sold-products/${id}`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteSoldProducts: build.mutation({
      query({ id, buildChanges }) {
        return {
          url: `delete-sold-products/${id}`,
          method: "DELETE",
          body: { buildChanges },
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),

    addRawMaterials: build.mutation({
      query(body) {
        return {
          url: `add-raw-materials`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    getRawMaterials: build.query({
      query(branch) {
        return {
          url: `raw-materials/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    getSingleRawMaterial: build.query({
      query(param) {
        const { branch, id } = param;

        return {
          url: `single-raw-materials/${branch}/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    updateRawMaterial: build.mutation({
      query({ id, ...rest }) {
        return {
          url: `raw-materials/${id}`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteRawMaterial: build.mutation({
      query(id) {
        return {
          url: `delete-raw-materials/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    addBilling: build.mutation({
      query(body) {
        return {
          url: `add-billing`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    getBilling: build.query({
      query(branch) {
        return {
          url: `billing/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    singleBilling: build.query({
      query(param) {
        const { branch, id } = param;
        return {
          url: `single-billing/${branch}/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    addBuyersPayment: build.mutation({
      query(body) {
        return {
          url: `add-buyers-payment`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),

    updateBilling: build.mutation({
      query({ id, body }) {
        return {
          url: `billing/${id}`,
          method: "PUT",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteBill: build.mutation({
      query(id) {
        return {
          url: `delete-billing/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),

    getDashboard: build.query({
      query(branch) {
        return {
          url: `dashboard/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),

    // Buyer details api
    addBuyerDetails: build.mutation({
      query(body) {
        return {
          url: `add-buyer`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    getBuyerDetails: build.query({
      query(branch) {
        return {
          url: `buyer/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    getSingleBuyerDetails: build.query({
      query(param) {
        const { branch, id } = param;

        return {
          url: `single-buyer/${branch}/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    updateBuyerDetails: build.mutation({
      query({ id, ...rest }) {
        return {
          url: `buyer/${id}`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteBuyerDetails: build.mutation({
      query(id) {
        return {
          url: `delete-buyer/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),

    // Quotation API
    addQuotation: build.mutation({
      query(body) {
        return {
          url: `add-quotation`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    getQuotation: build.query({
      query(branch) {
        return {
          url: `quotation/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    singleQuotation: build.query({
      query(param) {
        const { branch, id } = param;
        return {
          url: `single-quotation/${branch}/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),

    updateQuotation: build.mutation({
      query({ id, body }) {
        return {
          url: `quotation/${id}`,
          method: "PUT",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    deleteQuotation: build.mutation({
      query(id) {
        return {
          url: `delete-quotation/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),

    // Purchase details api
    addPurchaseDetails: build.mutation({
      query(body) {
        return {
          url: `add-purchase`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    getPurchaseDetails: build.query({
      query(branch) {
        return {
          url: `purchase/${branch}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    getSinglePurchaseDetails: build.query({
      query(param) {
        const { branch, id } = param;

        return {
          url: `single-purchase/${branch}/${id}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["products"],
    }),
    updatePurchaseDetails: build.mutation({
      query({ id, ...rest }) {
        return {
          url: `purchase/${id}`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
    deletePurchaseDetails: build.mutation({
      query(id) {
        return {
          url: `delete-purchase/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: ["products"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddBuildProductsMutation,
  useGetBuildProductsQuery,
  useLazyGetBuildProductsQuery,
  useLazyGetSingleBuildProductsQuery,
  useUpdateBuildProductsMutation,
  useDeleteBuildProductsMutation,
  useAddSoldProductsMutation,
  useGetSoldProductsQuery,
  useLazyGetSoldProductsQuery,
  useLazyGetSingleSoldProductsQuery,
  useUpdateSoldProductsMutation,
  useDeleteSoldProductsMutation,
  useAddRawMaterialsMutation,
  useGetRawMaterialsQuery,
  useLazyGetRawMaterialsQuery,
  useLazyGetSingleRawMaterialQuery,
  useUpdateRawMaterialMutation,
  useDeleteRawMaterialMutation,
  useAddBillingMutation,
  useGetBillingQuery,
  useLazySingleBillingQuery,
  useSingleBillingQuery,
  useUpdateBillingMutation,
  useDeleteBillMutation,
  useGetDashboardQuery,
  useAddBuyerDetailsMutation,
  useGetBuyerDetailsQuery,
  useLazyGetSingleBuyerDetailsQuery,
  useUpdateBuyerDetailsMutation,
  useDeleteBuyerDetailsMutation,
  useAddQuotationMutation,
  useGetQuotationQuery,
  useSingleQuotationQuery,
  useLazySingleQuotationQuery,
  useUpdateQuotationMutation,
  useDeleteQuotationMutation,
  useAddPurchaseDetailsMutation,
  useGetPurchaseDetailsQuery,
  useLazyGetSinglePurchaseDetailsQuery,
  useUpdatePurchaseDetailsMutation,
  useDeletePurchaseDetailsMutation,
} = productApi;
