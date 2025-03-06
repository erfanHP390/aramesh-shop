import { FaStar } from "react-icons/fa";
import styles from "./Comment.module.css";

const Comment = ({comment}) => {
    return (
        <section className={styles.comment}>
            <img src="/images/shahin.jpg" className={styles.avatar} alt="User Avatar" />
            <div>
                <div className={styles.main_details}>
                    <div className={styles.user_info}>
                        <strong>{comment.username}</strong>
                        <p>۲۸ آذر ۱۴۰۱</p>
                    </div>
                    <div className={styles.stars}>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                </div>
                <p>
                    {comment.body}
                </p>
            </div>
        </section>
    );
};

export default Comment;