"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getLowestPrice } from "../utils";
import SellProduct from "@/lib/models/sellproduct.model";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });
    if (existingProduct) {
      const updatePriceHistory: any = [
        ...existingProduct.priceHistory.priceHistory,
        {
          price: scrapedProduct.currentPrice,
        },
      ];
      product = {
        ...scrapedProduct,
        priceHistory: updatePriceHistory,
        lowestPrice: getLowestPrice(updatePriceHistory),
        averagePrice: getAveragePrice(updatePriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrapedProduct.url,
      },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/&{newProduct._id }`);
  } catch (error: any) {
    throw new Error("Failed to fetch product: ${error.message}");
  }
}
export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return null;
    } else {
      return product;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getSellerProductById(productId: string) {
  try {
    connectToDB();
    const product = await SellProduct.findOne({ _id: productId });
    if (!product) {
      return null;
    } else {
      return product;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getAllProducts() {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSellerProducts() {
  try {
    connectToDB();
    const sellproduct = await SellProduct.find();
    return sellproduct;
  } catch (error) {
    console.log(error);
  }
}
export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.findById({
      _id: { $ne: productId },
    }).limit(3);
    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);
    if (!product) return;

    const userExits = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExits) {
      product.users.push({ email: userEmail });
      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
