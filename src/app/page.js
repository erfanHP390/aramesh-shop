import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/templates/index/Banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import About from "@/components/templates/index/about/About";
import Articles from "@/components/templates/index/articles/Articles";
import Footer from "@/components/modules/Footer/Footer";
import { cookies } from "next/headers";
import UserModel from "@/models/User"
import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";

export default async function Home() {

  connectToDB()

  const token = cookies().get("token")
  let user = null

  if (token) {
    const tokenPayload = verifyToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
    }
  }

return (
<>
<Navbar isLogin={user} />
<Banner />
<Latest />
<About />
<Articles />
<Footer />
</>
);
}