import styles from "./Answer.module.css"


function Answer({type , title , body , createdAt , user , profileUser}) {
  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(createdAt).toLocaleString("fa-IR")}</p>
        <div>
          <div>
            <p>{user.name}</p>
            <span>{user.role === "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          <img                 src={profileUser ? profileUser.img : "/images/user2.avif"}
 alt="" />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{body}</p>
      </div>
    </section>
  )
}

export default Answer
