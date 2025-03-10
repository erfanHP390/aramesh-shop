"use client"
import styles from "./ProductWUser.module.css"
import Link from 'next/link';
import { FaRegStar, FaStar } from 'react-icons/fa';

function ProductWUser({ name, price, score, _id }) {

    const removeProduct = (productId) => {
        swal({
            title: "آیا از حذف محصول اطمینان دارید؟",
            icon: "warning",
            buttons: ["نه", "آره"],
        }).then((result) => {
            //code
        });
    };

    return (
        <div className={styles.card}>
            <Link href={"/"}>
                <img
                    width={283}
                    height={283}
                    src="https://set-coffee.com/wp-content/uploads/2022/03/ethiopia-430x430.png"
                    alt=""
                    style={{ width: '100%', height: 'auto' }} /* ریسپانسیو کردن تصویر */
                />
            </Link>
            <p dir="rtl">{name}</p>
            <div>
                <div>
                    {new Array(score).fill(0).map((item, index) => (
                        <FaStar key={index} />
                    ))}
                    {new Array(5 - score).fill(0).map((item, index) => (
                        <FaRegStar key={index} />
                    ))}
                </div>
                <span>{price?.toLocaleString()} تومان</span>
            </div>
            <button onClick={() => removeProduct(_id)} className={styles.delete_btn}>
                حذف محصول
            </button>
        </div>
    )
}

export default ProductWUser