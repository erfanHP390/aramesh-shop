"use client"
import { swalAlert } from "@/utils/helpers";
import styles from "./DataTable.module.css"
import { FaRegStar, FaStar } from "react-icons/fa";
import swal from "sweetalert";

function DataTable({ comments, title }) {

    const showCommentBody = (commentBody) => {
        swalAlert(commentBody, undefined, "فهمیدم");
    };

    return (
        <div>
            <div>
                <h1 className={styles.title}>
                    <span>{title}</span>
                </h1>
            </div>
            <div className={styles.table_container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>تاریخ</th>
                            <th>محصول</th>
                            <th>امتیاز</th>
                            <th>وضعیت</th>
                            <th>مشاهده</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                                <td>{comment.productID.name}</td>
                                <td>
                                    {new Array(comment.score).fill(0).map((item, index) => (
                                        <FaStar key={index} style={{ color: "#FFD700" }} /> /* تغییر رنگ ستاره‌ها به طلایی */
                                    ))}
                                    {new Array(5 - comment.score).fill(0).map((item, index) => (
                                        <FaRegStar key={index} style={{ color: "#A68A64" }} /> /* تغییر رنگ ستاره‌های خالی به قهوه‌ای روشن */
                                    ))}
                                </td>
                                <td>
                                    <button type="button" className={styles.no_check}>
                                        {comment.isAccept ? "تایید شده" : "در انتظار تایید"}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => showCommentBody(comment.body)}
                                        className={styles.btn}
                                    >
                                        مشاهده
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DataTable