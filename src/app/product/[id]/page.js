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

export async function generateMetadata({ params }) {
    await connectToDB();
    const product = await ProductModel.findOne({_id: params.id})
      .select('name smell shortDesc img tags price weight')
      .lean();
    
    return {
      title: `${product.name} | قهوه تخصصی آرامش - ${product.smell}`,
      description: `${product.shortDesc || `خرید ${product.name} - ${product.smell} با کیفیت عالی`} | قیمت: ${product.price.toLocaleString()} تومان | وزن: ${product.weight} گرم`,
      keywords: [
        product.name,
        `خرید ${product.name}`,
        `قهوه ${product.smell}`,
        `قیمت ${product.name}`,
        "قهوه اسپشیالیتی",
        "قهوه مرغوب",
        ...(product.tags || [])
      ],
      openGraph: {
        title: `${product.name} | آرامش`,
        description: product.shortDesc || `خرید ${product.name} با بهترین کیفیت`,
        url: `https://aramesh-coffee.com/products/${params.id}`,
        type: "website",
        images: [
          {
            url: product.img || "https://aramesh-coffee.com/images/product-default.jpg",
            width: 800,
            height: 600,
            alt: product.name,
          }
        ],
        siteName: "آرامش - فروشگاه تخصصی قهوه"
      },
      alternates: {
        canonical: `https://aramesh-coffee.com/products/${params.id}`
      }
    };
  }

export default async function page({params}) {
    connectToDB()
    const productID = params.id
    const product = await ProductModel.findOne({_id: productID}).populate("comments")

    const relatedProducts = await ProductModel.find({smell: product.smell})
    const filteredRelatedProducts = relatedProducts.filter(
        relatedProduct => String(relatedProduct._id) !== String(productID)
    )

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.longDesc || product.shortDesc,
        "brand": {
          "@type": "Brand",
          "name": "آرامش"
        },
        "image": product.img,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "IRR",
          "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "itemCondition": "https://schema.org/NewCondition"
        },
        "additionalProperty": {
          "@type": "PropertyValue",
          "name": "وزن",
          "value": `${product.weight} گرم`
        }
      };
    

    return (
        <div className={styles.container}>
            <Navbar  />
            <div data-aos="fade-up" className={styles.contents}>
                <div className={styles.main}>
                    <Gallery product={JSON.parse(JSON.stringify(product))} />
                    <Details product={JSON.parse(JSON.stringify(product))} />
                </div>
                <Tabs  product={JSON.parse(JSON.stringify(product))} />
                <MoreProducts  relatedProducts={JSON.parse(JSON.stringify(filteredRelatedProducts))} />
            </div>
            <Footer />
        </div>
    );
}