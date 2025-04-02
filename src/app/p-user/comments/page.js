import DataTable from "@/components/templates/p-user/comments/DataTable"
import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout"
import connectToDB from "@/configs/db"
import CommentModel from "@/models/Comment"
import { authUser } from "@/utils/authUserLink"


async function page() {

    connectToDB()
    const user = await authUser()
    const comments = await CommentModel.find({email: user.email , username: user.name} , "-__v").populate("productID" , "name")

    

  return (
    <UserPanelLayout>
            <main>
        <DataTable  comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        {/* <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>  */}
      </main>
    </UserPanelLayout>
  )
}

export default page
