import React from "react";
import styles from "./Title.module.css";
import Link from "next/link";

function Title({title , text , route}) {
  return (
    <h1 className={styles.title}>
      <span>{title}</span>
      {
        route && text && <Link href={route}>{text}</Link>
      }
    </h1>
  );
}

export default Title;
