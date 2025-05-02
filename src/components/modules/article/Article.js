import React from 'react'
import styles from "./Article.module.css"
import { MdOutlineSms } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";

function Article({_id , titr , title , author , img , createdAt , comments , imgStyle}) {
  return (
    <div className={styles.card}>
      <Link className={styles.img_container} href={`/blogs/${_id}`}>
        <img
          src={img}
          style={imgStyle}
          alt=""
        />
      </Link>
      <div className={styles.date}>
        <span>{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
      </div>
      <div className={styles.details}>
        <span className={styles.tag}>{titr}</span>
        <Link href={`/blogs/${_id}`} className={styles.title}>
          {title}
        </Link>
        <div>
          <p>نویسنده</p>
          <img
            src="https://secure.gravatar.com/avatar/665a1a4dc7cc052eaa938253ef413a78?s=32&d=mm&r=g"
            alt=""
          />
          <p>{author}</p>
          <div>
            <MdOutlineSms />
            <span>{comments.length}</span>
          </div>
          <div className={styles.share}>
            <IoShareSocialOutline />
            <div className={styles.tooltip}>
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
        </div>
      </div>
    </div>
  )
}

export default Article
