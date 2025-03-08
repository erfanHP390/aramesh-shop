import { FaFacebookF, FaStar, FaTwitter, FaRegStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./Details.module.css";
import AddToWishList from '@/components/templates/product/addToWishlist/AddToWishList';


const Details = ({ product }) => {
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
        <IoCheckmark />
        <p>موجود در انبار</p>
      </div>
      <div className={styles.cart}>
        <button>افزودن به سبد خرید</button>
        <div>
          <span>-</span>1<span>+</span>
        </div>
      </div>
      <section className={styles.wishlist}>
        <AddToWishList  productID={product._id} />
        <div>
          <TbSwitch3 />
          <a href="/">مقایسه</a>
        </div>
      </section>
      <hr />
      <div className={styles.details}>
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
