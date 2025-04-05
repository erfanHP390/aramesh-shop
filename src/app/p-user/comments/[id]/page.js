import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import CommentsDetails from '@/components/templates/p-user/comments/commentsDetail/CommentsDetails'
import connectToDB from '@/configs/db'
import { authUser } from '@/utils/authUserLink'
import React from 'react'
import CommentModel from "@/models/Comment"

async function page({params}) {

    connectToDB()
    const id = params.id
    const user = await authUser()

    const comment = await CommentModel.findOne({_id: id}).populate("productID").lean()

  return (
    <UserPanelLayout>
      <CommentsDetails  comment={JSON.parse(JSON.stringify(comment))} />
    </UserPanelLayout>
  )
}

export default page
