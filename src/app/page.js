import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/templates/index/Banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";
import About from "@/components/templates/index/about/About";
import Articles from "@/components/templates/index/articles/Articles";
import Footer from "@/components/modules/Footer/Footer";
import { authUser } from "@/utils/auth";

export default async function Home() {

  const user = await authUser()

  return (
    <>
      <Navbar  isLogin={user} />
      <Banner />
      <Latest />
      <About />
      <Articles /> 
      <Footer />
    </>
  );
}
