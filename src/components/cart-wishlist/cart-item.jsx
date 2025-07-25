'use client';
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Link from "next/link";
// internal
import { Close, Minus, Plus } from "@/svg";
import { add_cart_product, quantityDecrement, remove_product } from "@/redux/features/cartSlice";

const CartItem = ({product}) => {
  const {_id, image, title, salesPrice, orderQuantity = 0 } = product || {};

  const dispatch = useDispatch();

  const imageUrl = image?.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${image}`;

  const slug = product.slug || _id;

    // handle add product
    const handleAddProduct = (prd) => {
      dispatch(add_cart_product(prd))
    }
    // handle decrement product
    const handleDecrement = (prd) => {
      dispatch(quantityDecrement(prd))
    }
  
    // handle remove product
    const handleRemovePrd = (prd) => {
      dispatch(remove_product(prd))
    }

  return (
    <tr>
      {/* img */}
      <td className="tp-cart-img">
        <Link href={`/fabric/${slug}`}>
          {image && <Image src={imageUrl} alt={title || "product img"} width={70} height={100} style={{objectFit:'cover'}} />}
        </Link>
      </td>
      {/* title */}
      <td className="tp-cart-title">
        <Link href={`/fabric/${slug}`}>{title}</Link>
      </td>
      {/* price */}
      <td className="tp-cart-price">
        <span>${((salesPrice || 0) * orderQuantity).toFixed(2)}</span>
      </td>
      {/* quantity */}
      <td className="tp-cart-quantity">
        <div className="tp-product-quantity mt-10 mb-10">
          <span onClick={()=> handleDecrement(product)} className="tp-cart-minus">
            <Minus />
          </span>
          <input className="tp-cart-input" type="text" value={orderQuantity} readOnly />
          <span onClick={()=> handleAddProduct(product)} className="tp-cart-plus">
            <Plus />
          </span>
        </div>
      </td>
      {/* action */}
      <td className="tp-cart-action">
        <button onClick={()=> handleRemovePrd({title,id:_id})} className="tp-cart-action-btn">
          <Close />
          <span>{" "}Remove</span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
