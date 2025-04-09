import { authUser } from '@/utils/authUserLink';
import React from 'react';
import styles from "@/styles/product.module.css";
import Details from '@/components/templates/product/details/Details';
import Gallery from '@/components/templates/product/gallery/Gallery';
import Tabs from '@/components/templates/product/tabs/Tabs';
import MoreProducts from '@/components/templates/product/moreProducts/MoreProducts';
import Navbar from '@/components/modules/navbar/Navbar';
import Footer from '@/components/modules/Footer/Footer';
import ProductModel from "@/models/Product"
import connectToDB from '@/configs/db';

export default async function page({params}) {
    connectToDB()
    const user = await authUser();
    const productID = params.id
    const product = await ProductModel.findOne({_id: productID}).populate("comments")

    const relatedProducts = await ProductModel.find({smell: product.smell})
    const filteredRelatedProducts = relatedProducts.filter(
        relatedProduct => String(relatedProduct._id) !== String(productID)
    )

    return (
        <div className={styles.container}>
            <Navbar isLogin={user ? true : false} />
            <div data-aos="fade-up" className={styles.contents}>
                <div className={styles.main}>
                    <Gallery />
                    <Details product={JSON.parse(JSON.stringify(product))} />
                </div>
                <Tabs  product={JSON.parse(JSON.stringify(product))} />
                <MoreProducts  relatedProducts={JSON.parse(JSON.stringify(filteredRelatedProducts))} />
            </div>
            <Footer />
        </div>
    );
}