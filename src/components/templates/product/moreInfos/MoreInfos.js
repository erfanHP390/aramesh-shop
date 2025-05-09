import React from "react";
import styles from "./MoreInfos.module.css";

const MoreInfos = ({ product }) => {
  return (
    <div className={styles.moreInfos}>
      <h3 className={styles.title}>اطلاعات بیشتر</h3>
      <hr className={styles.divider} />
      <div className={styles.infoContainer}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>وزن:</span>
          <span className={styles.infoValue}>{product.weight} گرم</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>مناسب برای:</span>
          <span className={styles.infoValue}>{product.suitableFor}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>میزان بو:</span>
          <span className={styles.infoValue}>{product.smell}</span>
        </div>
      </div>
    </div>
  );
};

export default MoreInfos;