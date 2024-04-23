import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import { getAllProducts, getAllSellerProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
const Home = async () => {
  const allProducts = await getAllProducts();
  const allSellerProducts = await getAllSellerProducts();

  return (
    <>
    {/* <div className="container mx-auto mt-4">
        <div className="flex justify-end gap-4">
          <Link href="/app/Login" className="text-primary hover:underline">
            Login<LoginPage/>
          </Link>
          <Link href="/app/Signup" className="text-primary hover:underline">
            Sign Up<SignupPage/>
          </Link>


        </div>
      </div> */}
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Your daily shopping driver:{" "}
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the power of{" "}
              <span className="text-primary">Web Scrappers</span>
            </h1>
            <p className="mt-6">
              Powerful, self service product and growth analytics, helps you shop
              cheaper and better.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Local Seller products</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allSellerProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      
    </>
  );
};

export default Home;