"use client";
import { useState } from "react";
import styles from "./CommentArticle.module.css";

function CommentArticle({ comments }) {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentsWrapper}>
        <div className={styles.commentsHeader}>
          <h3 className={styles.commentSectionTitle}>نظرات کاربران ({comments.filter(comment => comment.isAccept).length})</h3>
        </div>

        <div className={styles.commentsList}>
          {
            comments.map((comment) =>
              comment.isAccept && (
                <div key={comment._id} className={styles.commentCard}>
                  <div className={styles.commentAvatar}>
                    <img
                      src={
                        comment.avatar ||
                        "https://secure.gravatar.com/avatar/placeholder?s=50&d=mm&r=g"
                      }
                      alt={comment.name}
                    />
                  </div>
                  <div className={styles.commentBody}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>
                        {comment.name}
                      </span>
                      <span className={styles.commentDate}>
                        {new Date(comment.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                    </div>
                    <p className={styles.commentContent}>
                      {comment.description}
                    </p>
                  </div>
                </div>
              ) 
            )}
        </div>
      </div>

      <form className={styles.commentForm}>
        <h3 className={styles.formTitle}>دیدگاهتان را بنویسید</h3>
        <p className={styles.formDescription}>
          نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
          <span className={styles.requiredStar}>*</span>
        </p>

        <div className={styles.formField}>
          <label className={styles.formLabel} htmlFor="comment">
            دیدگاه <span className={styles.requiredStar}>*</span>
          </label>
          <textarea
            className={styles.formTextarea}
            id="comment"
            required
            rows="6"
          />
        </div>

        <div className={styles.formFieldsRow}>
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="name">
              نام <span className={styles.requiredStar}>*</span>
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="name"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="email">
              ایمیل <span className={styles.requiredStar}>*</span>
            </label>
            <input
              className={styles.formInput}
              type="email"
              id="email"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="website">
              وب‌سایت
            </label>
            <input className={styles.formInput} type="url" id="website" />
          </div>
        </div>

        <div className={styles.formCheckbox}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            id="saveInfo"
          />
          <label className={styles.checkboxLabel} htmlFor="saveInfo">
            ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
            می‌نویسم.
          </label>
        </div>

        <button type="submit" className={styles.submitBtn}>
          ارسال دیدگاه
        </button>
      </form>
    </div>
  );
}

export default CommentArticle;
