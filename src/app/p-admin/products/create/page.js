import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import ProductCreate from '@/components/templates/p-admin/products/ProductCreate'
import React from 'react'

function page() {
  return (
    <AdminPanelLayout>
      <ProductCreate />
    </AdminPanelLayout>
  )
}

export default page
