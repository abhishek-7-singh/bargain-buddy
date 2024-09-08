import React from "react";
import { getProductById, getSellerProductById, getSimilarProducts } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SellProduct } from "@/types";
import { format } from "path";
import { formatNumber } from "@/lib/utils";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import Modal from "@/components/Modal";
//import Image from 'next/image';

type Props = {
  params: { id: string };
};
const SellerProductDetails = async ({ params: { id } }: Props) => {
    console.log(id);
  const product: SellProduct = await getSellerProductById(id);
  console.log(product);
  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    // <div>{id}</div>
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Missing tags added */}
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}
                  height={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">
                  10
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="bookmark"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[21px] text-black opacity-100 font-bold">
              ₹{formatNumber(product.price)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    25
                  </p>
                  {/* Missing tags added */}
                </div>
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    29 Reviews
                  </p>
                  {/* Missing tags added */}
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span>of
                the buyers have recommended this.
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              {/* Missing tags added */}
              <PriceInfoCard
                title="MRP"
                iconSrc="/assets/icons/price-tag.svg"
                value={formatNumber(
                  product.price
                )}
                borderColor="#b6dbff"
              />
            </div>
          </div>
          {/* Missing closing tag added */}
        </div>
      </div>

      <div className="flex flex-col gap-16 ">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Product Description
          </h3>
          <div className="flex flex-col gap-4">
            {product?.description?.split("\n").map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Seller Details and contact information
          </h3>
          <div className="flex flex-col gap-4">
            {product?.sellerdetail?.split("\n").map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
            src="/assets/icons/bag.svg"
            alt="check"
            width={22}
            height={22}
          />
          <Link href="https://api.whatsapp.com/send/?phone=7376318017&text&type=phone_number&app_absent=0" className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductDetails;