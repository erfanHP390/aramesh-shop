import React from 'react'
import styles from "./BreadCrumb.module.css"
import Link from 'next/link'

export default function BreadCrumb({route}) {
  return (
    <div className={styles.breadcrumb}>
      <p className={styles.title}>{route}</p>
      <div>
        <Link href={"/"}>خانه</Link>
        <span>/</span>
        <p>{route}</p>
      </div>
    </div>
  )
}
