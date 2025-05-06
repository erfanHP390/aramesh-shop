import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import connectToDB from '@/configs/db'
import React from 'react'
import BlogModel from "@/models/Blog"
import BlogDetails from '@/components/templates/p-admin/blogs/BlogDetails'
import Title from '@/components/modules/p-user/title/Title'


export const metadata = {
  title: "پنل مدیریت | جزئیات مقاله(ویرایش)",
};


async function page({params}) {

    connectToDB()
    const id = params.id

    const blog = await BlogModel.findOne({_id: id}).lean()

  return (
    <AdminPanelLayout>
      <Title title={"جزئیات مقاله"} route={"/p-admin/blogs"} text={"همه مقالات"} />
      <BlogDetails blog={JSON.parse(JSON.stringify(blog))}   />
    </AdminPanelLayout>
  )
}

export default page
