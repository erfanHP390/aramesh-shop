import Comment from "@/components/modules/comment/Comment";
import styles from "./Comments.module.css";
import CommentForm from "../commentForm/CommentForm";

const Comments = ({comments}) => {
    return (
        <div>
            <p>نظرات (7) :</p>
            <hr />
            <main className={styles.comments}>
                <div className={styles.user_comments}>
                    <p className={styles.title}>
                        {comments.length} دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD ) ده -10- عددی
                    </p>
                    <div>
                        {
                            comments.map(comment => (
                                <Comment  key={comment._id} comment={comment} />
                            ))
                        }
                    </div>
                </div>
                <div className={styles.form_bg}>
                    <CommentForm />
                </div>
            </main>
        </div>
    );
};

export default Comments;