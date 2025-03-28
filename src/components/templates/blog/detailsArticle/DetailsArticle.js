import Link from "next/link";
import styles from "./DetailsArticle.module.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

function DetailsArticle({ blog }) {
  return (
    <>
      <p className={styles.tag}>{blog.titr}</p>
      <p className={styles.title}>{blog.title}</p>
      <div className={styles.author}>
        <p>نویسنده</p>
        <img
          src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g"
          alt=""
        />
        <p>{blog.author}</p>
      </div>

      <div className={styles.main_img}>
        <div class={styles.date}>
          {new Date(blog.createdAt).toLocaleDateString("fa-IR")}
        </div>
        <img
          src={blog.img}
          alt=""
        />
      </div>
      <section>
        <p>
            {blog.description}
        </p>
      </section>


      <div className={styles.contents}>
        <div className={styles.icons}>
          <Link href={"/"}>
            <FaTelegram />
          </Link>
          <Link href={"/"}>
            <FaLinkedinIn />
          </Link>
          <Link href={"/"}>
            <FaPinterest />
          </Link>
          <Link href={"/"}>
            <FaTwitter />
          </Link>
          <Link href={"/"}>
            <FaFacebookF />
          </Link>
        </div>
      </div>
    </>
  );
}

export default DetailsArticle;
