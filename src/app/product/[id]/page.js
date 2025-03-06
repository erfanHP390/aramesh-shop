import { authUser } from '@/utils/authUserLink';
import React from 'react';
import styles from "@/styles/product.module.css";
import Details from '@/components/templates/product/details/Details';
import Gallery from '@/components/templates/product/gallery/Gallery';
import Tabs from '@/components/templates/product/tabs/Tabs';
import MoreProducts from '@/components/templates/product/moreProducts/MoreProducts';
import Navbar from '@/components/modules/navbar/Navbar';
import Footer from '@/components/modules/Footer/Footer';

export default async function page() {
    const user = await authUser();

    return (
        <div className={styles.container}>
            <Navbar isLogin={user ? true : false} />
            <div data-aos="fade-up" className={styles.contents}>
                <div className={styles.main}>
                    <Gallery />
                    <Details />
                </div>
                <Tabs />
                <MoreProducts />
            </div>
            <Footer />
        </div>
    );
}