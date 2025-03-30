"use client"
import React, { useEffect, useState } from 'react'
import styles from "./Orders.module.css"
import Link from 'next/link'

function Orders() {

    const [showZarinPallAlert, setShowZarinPallAlert] = useState(false)
    const [cart , setCart] = useState([])
        const [priceCart , setPriceCart] = useState([])

      useEffect(() => {
        const getCart = JSON.parse(localStorage.getItem("cart")) || [];
        const getPricesCart = JSON.parse(localStorage.getItem("priceCart")) || [];
    
        setPriceCart(getPricesCart);
    
        setCart(getCart);
      }, []);


  return (
    <div className={styles.order}>
    <p className={styles.title}>سفارش شما</p>
    <main className={styles.main}>
        <div>
            <p>جمع جزء</p>
            <p>محصول</p>
        </div>
        {
  cart.map((item) => (
    <div className={styles.cart_item} key={item.id}>
      <div className={styles.price_row}>
        <span className={styles.item_price}>{item.price.toLocaleString()}</span>
        <span className={styles.currency}>تومان</span>
      </div>
      <p className={styles.product_name}>
        {item.name} × {item.count}
      </p>
    </div>
  ))
}
        <div>
            <p> {priceCart.productPrice.toLocaleString()} تومان</p>
            <p>جمع کل محصولات</p>
        </div>
        <div>
            <p>پیک موتوری: <strong> {priceCart.postPrice.toLocaleString()} تومان</strong></p>
            <p>حمل و نقل</p>
        </div>
        <div>
            <div>
                <h2>{priceCart.totalPrice.toLocaleString()} تومان</h2>
                <p>(شامل <strong>16,927</strong> تومان ارزش افزوده)</p>
            </div>
            <h3>مجموع</h3>
        </div>
    </main>
    <div className={styles.transaction}>
        <div>
            <input onClick={() => setShowZarinPallAlert(false)} type="radio" name="payment_method" value="melli" />
            <label> بانک ملی</label>
            <img width={24} height={40} src="https://set-coffee.com/wp-content/plugins/WooCommerce-melli/images/logo.png" alt="بانک ملی"></img>
        </div>
        <div>
            <input onClick={() => setShowZarinPallAlert(true)} type="radio" name="payment_method" value="zarinpal" />
            <label>پرداخت امن زرین پال </label>
            <img width={40} height={40} src="https://set-coffee.com/wp-content/plugins/zarinpal-woocommerce-payment-gateway/assets/images/logo.png" alt="زرین پال"></img>
        </div>
        {showZarinPallAlert && (
            <div className={styles.paymentBox}>
                <p>پرداخت امن به وسیله کلیه کارت های عضو شتاب از طریق درگاه زرین پال</p>
            </div>
        )}
        <div className={styles.warning}>
            <p>اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این وبسایت و برای اهداف دیگری که در <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده می‌شود.</p>
        </div>
        <div className={styles.accept_rules}>
            <input type="checkbox" name="" id="" />
            <p> من<strong> شرایط و مقررات</strong> سایت را خوانده ام و آن را می پذیرم. <span>*</span></p>
        </div>
        <Link href={'/complate-order'}> <button className={styles.submit}>ثبت سفارش</button> </Link> 
    </div>

</div>
  )
}

export default Orders
