"use client"
import { swalAlert } from "@/utils/helpers";
import styles from "./DataTable.module.css"
import { FaRegStar, FaStar } from "react-icons/fa";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function DataTable({ comments, title }) {

    const router = useRouter()

    const showCommentBody = (commentBody) => {
        swalAlert(commentBody, undefined, "فهمیدم");
    };

    const deleteComment = async (commentID) => {
        swal({
          title: "آیا از حذف کاربر اطمینان دارین؟",
          icon: "warning",
          buttons: ["نه", "آره"],
        }).then(async (result) => {
    
          if(result) {
    
            const res = await fetch(`/api/comment/${commentID}` , {
              method: "DELETE"
            })
    
            if(res.status === 200) {
              swalAlert("کامنت با موفقیت حذف شد" , "success" , "فهمیدم")
              router.refresh()
            }
    
          }
    
        })
    
    
    
      }

      const editComment = async (commentID) => {
        console.log(commentID);
        
      }

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
                            <th>ویرایش</th>
                            <th>حذف</th>
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
                                <td>
                                    <button
                                        type="button"
                                        className={styles.btn}
                                        onClick={() => editComment(comment._id)}
                                    >
                                        ویرایش
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className={styles.btn}
                                        onClick={() => deleteComment(comment._id)}
                                    >
                                        حذف
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