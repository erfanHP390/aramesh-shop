"use client";
import React, { useState } from "react";
import styles from "./Tabs.module.css";
import Description from "../description/Description";
import MoreInfoes from "../moreInfos/MoreInfos";
import Comments from "../comments/Comments";

const Tabs = ({ product }) => {
  const [tab, setTab] = useState("description");

  return (
    <>
      <div data-aos="fade-left" className={styles.tabs}>
        <ul>
          <li>
            <button
              className={tab === "description" ? styles.active_tab : ""}
              onClick={() => setTab("description")}
            >
              توضیحات
            </button>
          </li>
          <li>
            <button
              className={tab === "moreInfoes" ? styles.active_tab : ""}
              onClick={() => setTab("moreInfoes")}
            >
              اطلاعات بیشتر
            </button>
          </li>
          <li>
            <button
              className={tab === "comments" ? styles.active_tab : ""}
              onClick={() => setTab("comments")}
            >
              نظرات (
              {product.comments.filter((comment) => comment.isAccept).length})
            </button>
          </li>
        </ul>

        <div className={styles.contents}>
          <section>
            {tab === "description" && <Description desc={product.longDesc} />}
            {tab == "moreInfoes" && (
              <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
            )}
            {tab == "comments" && (
              <Comments
                product={product}
                productID={product._id}
                comments={JSON.parse(JSON.stringify(product.comments))}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Tabs;
