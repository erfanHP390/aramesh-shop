import Breadcrumb from "@/components/modules/breadcrumb/BreadCrumb";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Product from "@/components/modules/product/Product";
import connectToDB from "@/configs/db";
import styles from "@/styles/wishlist.module.css";
import { authUser } from "@/utils/authUserLink";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishlistModel from "@/models/Wishlist";

const page = async () => {
  let wishes = [];
  connectToDB();
  const user = await authUser();
  if (user) {
    wishes = await WishlistModel.find({ user: user._id })
      .populate("product", "name price score img")
      .lean();
    }
    const validWishlist = wishes.filter(wish => wish.product !== null);

  return (
    <>
      <Navbar  />
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section className={styles.wishes_product}>
          {validWishlist.length > 0 &&
            validWishlist.map((wish) => <Product key={wish._id} {...wish.product} />)}
        </section>
      </main>

      {validWishlist.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default page;