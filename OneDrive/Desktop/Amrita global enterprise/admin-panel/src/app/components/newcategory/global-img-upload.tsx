import React, { useEffect } from "react";
import Image from "next/image";
import useUploadImage from "@/hooks/useUploadImg";
import upload_default from "@assets/img/icons/upload.png";
import Loading from "../common/loading";
import UploadImage from "../products/add-product/upload-image";

// prop type
type IPropType = {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: boolean;
  default_img?: string;
  imageFile?: File | null;
  imageUrl?: string;
  setIsSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalImgUpload = ({
  setImageFile,
  setImageUrl,
  isSubmitted,
  default_img,
  imageFile,
  imageUrl,
  setIsSubmitted,
}: IPropType) => {
  const { handleImageUpload, uploadData, isError, isLoading } =
    useUploadImage();
  const showDefaultImage = !uploadData && !isLoading && !isError && default_img;

  const upload_img = isLoading ? (
    <Loading loading={isLoading} spinner="scale" />
  ) : uploadData?.data.url ? (
    <UploadImage
      file={{
        url: uploadData.data.url,
        id: uploadData.data.id,
      }}
      isCenter={true}
      setImgUrl={setImageUrl}
    />
  ) : showDefaultImage ? (
    <Image src={default_img} alt="upload-img" width={100} height={91} />
  ) : (
    <Image src={upload_default} alt="upload-img" width={100} height={91} />
  );

  // set upload image
  useEffect(() => {
    if (isLoading && setIsSubmitted) {
      setIsSubmitted(false);
    }
  }, [isLoading, setIsSubmitted]);

  useEffect(() => {
    if (uploadData && !isError && !isLoading) {
      setImageUrl(uploadData.data.url);
    } else if (default_img) {
      setImageUrl(default_img);
    }
  }, [default_img, uploadData, isError, isLoading, setImageUrl]);

  return (
    <div className="mb-6">
      <p className="mb-2 text-base text-black">Upload Image</p>
      <div className="text-center">
        {isSubmitted ? (
          <Image
            src={upload_default}
            alt="upload-img"
            width={100}
            height={91}
          />
        ) : (
          upload_img
        )}
      </div>
      <span className="text-tiny text-center w-full inline-block mb-3">
        (Only png* jpg* jpeg* webp/ will be accepted)
      </span>
      <div className="">
        <input
          onChange={e => setImageFile(e.target.files?.[0] || null)}
          type="file"
          name="image"
          id="categoryImage"
          className="hidden"
        />
        <label
          htmlFor="categoryImage"
          className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
        >
          Upload Image
        </label>
      </div>
    </div>
  );
};

export default GlobalImgUpload;
