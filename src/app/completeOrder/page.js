import Stepper from "@/components/modules/cart/stepper/Stepper";
import Footer from "@/components/modules/Footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import React from "react";
import connectToDB from "@/configs/db";
import Main from "@/components/templates/completeOrder/Main";

async function page() {
  connectToDB();

  return (
    <>
      <Navbar />
      <Stepper step="complate" />
      <Main />
      <Footer />
    </>
  );
}

export default page;
