import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
 // reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      // Always set API key header
      if (process.env.NEXT_PUBLIC_API_KEY) {
        headers.set('x-api-key', process.env.NEXT_PUBLIC_API_KEY);
      }
      // Optionally set admin email header for admin endpoints
      if (process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        headers.set('x-admin-email', process.env.NEXT_PUBLIC_ADMIN_EMAIL);
      }
      // Existing JWT logic
      const userInfo = Cookies.get('userInfo');
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        } catch (error) {
          console.error('Error parsing user info:', error);
          Cookies.remove('userInfo');
        }
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Products", "Coupon", "Product", "RelatedProducts", "UserOrder", "UserOrders",
    "ProductType", "OfferProducts", "PopularProducts", "TopRatedProducts", "NewProducts",
    "Structure", "Content", "Finish", "Design", "Color", "MotifSize", "SuitableFor",
    "Vendor", "PopularNewProducts", "OfferNewProducts", "TopRatedNewProducts"
  ]
});