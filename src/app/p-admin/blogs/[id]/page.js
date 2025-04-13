import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import connectToDB from '@/configs/db'
import React from 'react'
import BlogModel from "@/models/Blog"
import BlogDetails from '@/components/templates/p-admin/blogs/BlogDetails'

async function page({params}) {

    connectToDB()
    const id = params.id

    const blog = await BlogModel.findOne({_id: id}).lean()

  return (
    <AdminPanelLayout>
      <BlogDetails blog={JSON.parse(JSON.stringify(blog))}   />
    </AdminPanelLayout>
  )
}

export default page
