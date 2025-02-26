import Navbar from "@/components/modules/navbar/Navbar";
import Banner from "@/components/templates/index/Banner/Banner";
import Latest from "@/components/templates/index/latest/Latest";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Latest />
    </>
  );
}
