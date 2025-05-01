import React from "react";
import styles from "./Description.module.css";

const Description = ({desc}) => {
    return (
        <div className={styles.description}>
            <p>توضیحات :</p>
            <hr />
            <p>
                {desc}
            </p>
        </div>
    );
};

export default Description;