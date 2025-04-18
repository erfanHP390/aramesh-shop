"use client";
import { useEffect, useState } from "react";
import styles from "./CommentArticle.module.css";
import { swalAlert, toastError, toastSuccess } from "@/utils/helpers";
import { validateEmail } from "@/utils/auth";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

function CommentArticle({ comments, blogId }) {

  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveUserInfo , setIsSaveUserInfo] = useState(false)

    useEffect(() => {
  
      const getUserInfoComment = JSON.parse(localStorage.getItem("UserReaderBlogs"))
  
      if(getUserInfoComment) {
        setName(getUserInfoComment.name)
        setEmail(getUserInfoComment.email)
        setEducation(getUserInfoComment.education)
      }
  
    } , [])

  const AddComment = async (event) => {
    event.preventDefault();

    if (!name || !email || !description || !blogId || !education) {
      setIsLoading(false);
      return swalAlert("لطفا تمامی موارد   را پر کنید", "error", "فهمیدم");
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setIsLoading(false);
      return swalAlert("لطفا ایمیل خود را صحیح وارد کنید", "error", "فهمیدم");
    }

    if(isSaveUserInfo) {
      const userReaderBlogInfo = {
        name,
        email,
        education
      }

      localStorage.setItem("UserReaderBlogs" , JSON.stringify(userReaderBlogInfo))
    }

    const newCommentBlog = {
      name,
      email,
      description,
      education,
      blogID: blogId,
    };

    const res = await fetch("/api/blog/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommentBlog),
    });

    if (res.status === 201) {
      setIsLoading(false);
      setName("");
      setEmail("");
      setEducation("");
      setDescription("");
      toastSuccess(
        "نظر شما با موفقیت انجام شد",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
      router.refresh()
    } else if (res.status === 400) {
      setIsLoading(false);
      setName("");
      setEmail("");
      setEducation("");
      setDescription("");
      toastError(
        "لطفا تمامی موارد را پرکنید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 422) {
      setIsLoading(false);
      setName("");
      setEmail("");
      setEducation("");
      setDescription("");
      toastError(
        "لطفا یک ایمیل معتبر وارد کنید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    } else if (res.status === 500) {
      setIsLoading(false);
      setName("");
      setEmail("");
      setEducation("");
      setDescription("");
      toastError(
        "خطا در سرور ، لطفا بعدا تلاش کنید",
        "top-center",
        5000,
        false,
        true,
        true,
        true,
        undefined,
        "colored"
      );
    }
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentsWrapper}>
        <div className={styles.commentsHeader}>
          <h3 className={styles.commentSectionTitle}>
            نظرات کاربران (
            {comments.filter((comment) => comment.isAccept).length})
          </h3>
        </div>

        <div className={styles.commentsList}>
          {comments.map(
            (comment) =>
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="website">
              میزان تحصیلات
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="website"
              value={education}
              onChange={(event) => setEducation(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.formCheckbox}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            id="saveInfo"
            value={isSaveUserInfo}   onChange={(event) => setIsSaveUserInfo((prevValue) => !prevValue)}
          />
          <label className={styles.checkboxLabel} htmlFor="saveInfo">
            ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
            می‌نویسم.
          </label>
        </div>

        <button
          className={styles.submitBtn}
          onClick={(event) => {
            setIsLoading(true);
            AddComment(event);
          }}
        >
          {isLoading ?  <Loading /> : "ارسال دیدگاه"}
        </button>
      </form>
    </div>
  );
}

export default CommentArticle;
