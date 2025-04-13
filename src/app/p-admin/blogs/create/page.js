import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import BlogCreate from '@/components/templates/p-admin/blogs/BlogCreate'


function page() {

  return (
    <AdminPanelLayout>
        <BlogCreate />
    </AdminPanelLayout>
  )
}

export default page
