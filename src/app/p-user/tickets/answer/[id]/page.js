import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import Link from 'next/link'
import styles from "@/styles/p-user/answerTicket.module.css"
import Answer from '@/components/templates/p-user/tickets/answer/Answer'
import connectToDB from '@/configs/db'
import TicketModel from "@/models/Ticket"

async function page({params}) {

    connectToDB()
    const ticketID = params.id
    const ticket = await TicketModel.findOne({_id: ticketID})

  return (
    <UserPanelLayout>
            <main className={styles.container}>
        <h1 className={styles.title}>
          <span>تیکت تستی</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer type="user" />
          <Answer type="admin" />

          {/* <div className={styles.empty}>
            <p>هنوز پاسخی دریافت نکردید</p>
          </div> */}
        </div>
      </main>
    </UserPanelLayout>
  )
}

export default page
