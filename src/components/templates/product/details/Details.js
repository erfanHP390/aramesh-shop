"use client";
import { FaFacebookF, FaStar, FaTwitter, FaRegStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./Details.module.css";
import AddToWishList from "@/components/templates/product/addToWishlist/AddToWishList";
import { useState } from "react";
import { swalAlert } from "@/utils/helpers";

const Details = ({ product }) => {
  const [count, setCount] = useState(1);
  const isBrowser = typeof window !== "undefined";

  const addProductHandler = (cart) => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      img: product.img,
      count,
    };

    cart.push(cartItem);

    if (isBrowser) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    swalAlert("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
  };

  const addToCart = () => {
    if (isBrowser) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length) {
        const isInCart = cart.some((item) => item.id === product._id);

        if (isInCart) {
          cart.forEach((item) => {
            if (item.id === product._id) {
              item.count = item.count + count;
            }
          });

          localStorage.setItem("cart", JSON.stringify(cart));
          swalAlert(
            "تعداد محصول با موفقیت به روزرسانی شد",
            "success",
            "فهمیدم"
          );
        } else {
          addProductHandler(cart);
        }
      } else {
        addProductHandler(cart);
      }
    }
  };

  return (
    <main className={styles.details}>
      <h2>{product.name}</h2>
      <div className={styles.rating}>
        <div>
          {new Array(product.score).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - product.score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <p>(دیدگاه {product.comments.length} کاربر)</p>
      </div>
      <p className={styles.price}>{product.price.toLocaleString()} تومان</p>
      <span className={styles.description}>{product.shortDesc}</span>
      <hr />
      <div className={styles.Available}>
        {product.uses === product.stock ? (
          <>
            <p className={styles.cart}>اتمام موجودی</p>
          </>
        ) : (
          <>
            <IoCheckmark />
            <p>موجود در انبار</p>
          </>
        )}
      </div>
      {product.uses === product.stock ? (
        <>
          <div className={styles.cart}>
            <button>موجود شد خبرم کن</button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.cart}>
            <div className={styles.quantity_control}>
              <span onClick={() => setCount(count > 1 ? count - 1 : 1)}>-</span>
              <span>{count}</span>
              <span onClick={() => setCount(count + 1)}>+</span>
            </div>
            <button onClick={() => addToCart()}>افزودن به سبد خرید</button>
          </div>
        </>
      )}
      <section className={styles.wishlist}>
        <div className={styles.wishlist_item}>
          <AddToWishList productID={product._id} />
        </div>
        <div className={styles.compare_item}>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>
      <hr />
      <div className={styles.product_info}>
        <strong>شناسه محصول: GOLD Nespresso Compatible capsule</strong>
        <p>
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong> {product.tags.join(",")}
        </p>
      </div>
      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>
      <hr />
    </main>
  );
};

export default Details;
