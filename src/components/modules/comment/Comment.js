import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./Comment.module.css";

const Comment = ({ comment }) => {
  return (
    <section className={styles.comment}>
      <img
        src="/images/shahin.jpg"
        className={styles.avatar}
        alt="User Avatar"
      />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>{comment.username}</strong>
            <p>۲۸ آذر ۱۴۰۱</p>
          </div>
          <div className={styles.stars}>
            {new Array(comment.score).fill(0).map((item, index) => (
              <FaStar key={index} />
            ))}
            {new Array(5 - comment.score).fill(0).map((item, index) => (
              <FaRegStar key={index} />
            ))}
          </div>
        </div>
        <p>{comment.body}</p>
      </div>
    </section>
  );
};

export default Comment;
