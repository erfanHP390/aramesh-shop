import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import React from "react";
import styles from "@/styles/p-user/wishlist.module.css";
import ProductWUser from "@/components/templates/p-user/wishlist/ProductWUser";
import { authUser } from "@/utils/authUserLink";
import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";
import Title from "@/components/modules/p-user/title/Title";
import EmptyCart from "@/components/modules/EmptyCart/EmptyCart";
import { MdProductionQuantityLimits } from "react-icons/md";
  export const metadata = {
    title: "پنل کاربری | علاقمندی ها",
  };

async function page() {
  connectToDB();
  const user = await authUser();
  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );

  const validWishlist = wishlist.filter((wish) => wish.product !== null);

  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }


  return (
    <UserPanelLayout>
      <main>
        <Title title={" علاقه مندی ها"} />
        <div className={styles.container}>
          {validWishlist.length > 0 ? (
            <>
              {validWishlist.map((wish) => (
                <ProductWUser
                  key={wish._id}
                  wishID={wish._id}
                  name={wish.product.name}
                  price={wish.product.price}
                  score={wish.product.score}
                  img={wish.product.img}
                  productID={String(wish.product._id)}
                />
              ))}
            </>
          ) : (
            <>
              <EmptyCart
                icon={<MdProductionQuantityLimits />}
                body={"میتوانید در بخش فروشگاه نسبت به انتخاب علاقه مندی های خود اقدام نمایید"}
                title={"محصولی وجود ندارد"}
                href={"/category"}
                textLink={"رفتن به فروشگاه"}
              />
            </>
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
}

export default page;
