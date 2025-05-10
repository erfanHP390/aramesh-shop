import Stepper from "@/components/modules/cart/stepper/Stepper";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Table from "@/components/templates/cart/table/Table";
import connectToDB from "@/configs/db";
import styles from "@/styles/cart.module.css";
import { authUser } from "@/utils/authUserLink";

async function page() {
  connectToDB()
  const user = await authUser()
  return (
    <>
      <Navbar />
      <Stepper step="cart" />

      <main className={styles.cart} data-aos="fade-up">
        <Table userID={JSON.parse(JSON.stringify(user._id))} />
      </main>
      <Footer />
    </>
  );
}

export default page;
