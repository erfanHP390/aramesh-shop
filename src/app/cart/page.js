import Stepper from "@/components/modules/cart/stepper/Stepper";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Table from "@/components/templates/cart/table/Table";
import styles from "@/styles/cart.module.css";

async function page() {
  return (
    <>
      <Navbar />
      <Stepper step="cart" />

      <main className={styles.cart} data-aos="fade-up">
        <Table />
      </main>
      <Footer />
    </>
  );
}

export default page;
