import { notifySuccess, notifyError } from "@/utils/toast";
import {
  useAddCategoryMutation,
  useEditCategoryMutation,
} from "@/redux/category/categoryApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const useCategorySubmit = () => {
  const [categoryImg, setCategoryImg] = useState<string>("");
  const [parent, setParent] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [selectProductType, setSelectProductType] = useState<string>("");
  const [categoryChildren, setCategoryChildren] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [
    addCategory,
    { data: categoryData, isError, isLoading, error: addCateErr },
  ] = useAddCategoryMutation();
  // edit
  const [
    editCategory,
    {
      data: editCateData,
      isError: editErr,
      isLoading: editLoading,
      error: editCateErr,
    },
  ] = useEditCategoryMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitCategory
  const handleSubmitCategory = async (data: any) => {
    try {
      const category_data = {
        img: categoryImg,
        parent: data?.parent,
        description: data?.description,
        productType: data?.productType?.value,
        children: categoryChildren,
      };
      const res = await addCategory({ ...category_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Category added successfully");
        setIsSubmitted(true);
        reset();
        setCategoryChildren([]);
        setCategoryImg("");
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditCategory = async (data: any, id: string) => {
    try {
      const category_data = {
        img: categoryImg,
        parent: data?.parent,
        description: data?.description,
        productType: data?.productType?.value,
        children: categoryChildren,
      };
      const res = await editCategory({ id, data: category_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Category update successfully");
        router.push("/category");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  return {
    selectProductType,
    setSelectProductType,
    register,
    handleSubmit,
    setValue,
    errors,
    control,
    categoryImg,
    setCategoryImg,
    parent,
    setParent,
    description,
    setDescription,
    categoryChildren,
    setCategoryChildren,
    handleSubmitCategory,
    error,
    isSubmitted,
    handleSubmitEditCategory,
  };
};

export default useCategorySubmit;
