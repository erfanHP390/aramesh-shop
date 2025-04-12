import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import React from 'react'
import BlogModel from "@/models/Blog"
import BlogTable from '@/components/templates/p-admin/blogs/BlogTable'
import connectToDB from '@/configs/db'

async function page() {

    connectToDB()
    const blogs = await BlogModel.find({}).sort({ _id: -1 }).populate("comments").lean();


  return (
    <AdminPanelLayout>
      <BlogTable    blogs={JSON.parse(JSON.stringify(blogs))}         title="لیست مقالات" />
    </AdminPanelLayout>
  )
}

export default page
