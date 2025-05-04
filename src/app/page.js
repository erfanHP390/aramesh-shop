import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/templates/index/Banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import About from "@/components/templates/index/about/About";
import Articles from "@/components/templates/index/articles/Articles";
import Footer from "@/components/modules/Footer/Footer";
import connectToDB from "@/configs/db";
import { authAdmin, authUser } from "@/utils/authUserLink";
import ProductModel from "@/models/Product";
import WishListModel from "@/models/Wishlist";

export default async function Home() {
  connectToDB();

  const user = await authUser();
  // const admin = await authAdmin();

  const products = await ProductModel.find();
  const wishlist = await WishListModel.find({});

  return (
    <>
      <Navbar />
      <Banner />
      <Latest products={JSON.parse(JSON.stringify(products))} />
      <About />
      <Articles />
      <Footer />
    </>
  );
}
