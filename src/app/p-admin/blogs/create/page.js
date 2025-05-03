import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import Title from '@/components/modules/p-user/title/Title'
import BlogCreate from '@/components/templates/p-admin/blogs/BlogCreate'


function page() {

  return (
    <AdminPanelLayout>
      <Title route={"/p-admin/blogs"} text={"همه مقالات"} title={"ایجاد مقاله"} />
        <BlogCreate />
    </AdminPanelLayout>
  )
}

export default page
