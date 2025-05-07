"use client";
import React, { useState } from "react";
import styles from "./OrdersMain.module.css";
import Modal from "@/components/modules/Modal/Modal";

function OrdersMain({ orders }) {
  const [showModal, setShowModal] = useState(false);
  const [order , setOrder] = useState("")
  const hideModal = () => setShowModal(false);

  const showInfoOrder = async (code) => {

    const selectedOrder = orders.filter(order => order.orderCode == code)

    setOrder(selectedOrder)
    
    
  }

  return (
    <>
      <main>
        <div>
          <div className={styles.table_container}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>تاریخ</th>
                  <th>وضعیت</th>
                  <th>محصول</th>
                  <th>مبلغ </th>
                  <th>عملیات ها</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td>{orders.isPay ? "تکمیل شده" : "در انتظار پرداخت"}</td>
                    <td>{order.products.length}</td>
                    <td>{order.totalPrice.toLocaleString()}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          setShowModal(true)
                          showInfoOrder(order.orderCode)
                        }}
                        className={styles.btn}
                      >
                        نمایش
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* {orders.length === 0 && <EmptyCart title={"سفارشی وجود ندارد"} /> } */}
      </main>
      {showModal && (
        <>
          {order.map((order) => (
            <Modal title="مشخصات سفارش" hideModal={hideModal}>
              <p className={styles.modal_title}>
                سفارش #{order.orderCode} در تاریخ {new Date(order.createdAt).toLocaleDateString("fa-IR")} ثبت شده است و در حال حاضر در
                وضعیت تکمیل شده می باشد
              </p>
              <div className={styles.groups}>
                <div className={styles.group}>
                  <p>محصول</p>
                  <p>مجموع</p>
                </div>
                {
                  order.products.map(item => (
                    <div className={styles.group}>
                    <p>{item.name}</p>
                    <p>{item.price.toLocaleString()} هزار تومان</p>
                  </div>
                  ))
                }
                <div className={styles.group}>
                  <p>جمع کل سبد خرید:</p>
                  <p>{(order.totalPrice - order.postPrice).toLocaleString()} تومان</p>
                </div>
                <div className={styles.group}>
                  <p>قیمت نهایی:</p>
                  <p> {order.totalPrice.toLocaleString()} تومان</p>
                </div>
              </div>
              <div></div>
              <button className={styles.modal_btn}>سفارش دوباره</button>
              <div className={styles.modal_bill}>
                <p>آدرس صورت حساب:</p>
                <div>
                  <p>{`${order.firstName} - ${order.lastName}`}</p>
                  <p>{order.mobile}</p>
                  <p>{order.email}</p>
                </div>
              </div>
            </Modal>
          ))}
        </>
      )}
    </>
  );
}

export default OrdersMain;
