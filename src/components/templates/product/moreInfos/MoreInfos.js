import React from "react";
import styles from "./MoreInfos.module.css";

const MoreInfoes = () => {
    return (
        <div className={styles.moreInfoes}>
            <p>اطلاعات بیشتر :</p>
            <hr />
            <main>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>وزن</p>
                    <p>10 کیلو</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>وزن</p>
                    <p>10 کیلو</p>
                </div>
            </main>
        </div>
    );
};

export default MoreInfoes;