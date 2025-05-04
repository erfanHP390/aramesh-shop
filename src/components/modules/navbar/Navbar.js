import NavbarClient from "./NavbarClient";
import connectToDB from "@/configs/db";
import { authAdmin, authUser } from "@/utils/authUserLink";
import WishListModel from "@/models/Wishlist";
// import { cookies } from "next/headers";

export default async function Navbar() {
  connectToDB();

  const user = await authUser();
  const admin = await authAdmin();

  const wishlist = await WishListModel.find({});
  // const cookieHeader = cookies.get("refresh-token")


  return (
    <>
      <NavbarClient
        isLogin={user ? true : false}
        isAdmin={admin ? true : false}
        whishList={wishlist.length}
        // cookieHeader={cookieHeader}
      />
    </>
  );
}
