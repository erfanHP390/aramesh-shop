import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout";
import React from "react";
import styles from "@/styles/p-user/wishlist.module.css";
import ProductWUser from "@/components/templates/p-user/wishlist/ProductWUser";
import { authUser } from "@/utils/authUserLink";
import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import BanModel from "@/models/Ban";
import { redirect } from "next/navigation";

async function page() {
  connectToDB();
  const user = await authUser();
  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );

  const banUserEmail = await BanModel.findOne({ email: user.email }).lean();
  const banUserPhone = await BanModel.findOne({ phone: user.phone }).lean();

  if (banUserEmail || banUserPhone) {
    redirect("/p-user/account-details");
  }

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length > 0 ? (
            <>
              {wishlist.map((wish) => (
                <ProductWUser
                  key={wish._id}
                  name={wish.product.name}
                  price={wish.product.price}
                  score={wish.product.score}
                  productID={String(wish.product._id)}
                />
              ))}
            </>
          ) : (
            <>
              <p className={styles.empty}>محصولی وجود ندارد</p>
            </>
          )}
        </div>
      </main>
    </UserPanelLayout>
  );
}

export default page;
