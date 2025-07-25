import { apiSlice } from "../api/apiSlice";
import {
  CategoryResponse,
  IAddCategory,
  IAddCategoryResponse,
  ICategoryDeleteRes,
} from "@/types/category-type";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => `/api/category/all`,
      providesTags: ["AllCategory"],
      keepUnusedDataFor: 600,
    }),
    // add category
    addCategory: builder.mutation<IAddCategoryResponse, IAddCategory>({
      query(data: IAddCategory) {
        return {
          url: `/api/category/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCategory"],
    }),
    // delete category
    deleteCategory: builder.mutation<ICategoryDeleteRes, string>({
      query(id: string) {
        return {
          url: `/api/category/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCategory"],
    }),
    // editCategory
    editCategory: builder.mutation<
      IAddCategoryResponse,
      { id: string; data: Partial<IAddCategory> }
    >({
      query({ id, data }) {
        return {
          url: `/api/category/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCategory", "getCategory"],
    }),
    // get single product
    getCategory: builder.query<IAddCategory, string>({
      query: (id) => `/api/category/get/${id}`,
      providesTags: ["getCategory"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} = categoryApi;

export default categoryApi;
