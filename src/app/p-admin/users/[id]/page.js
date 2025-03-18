import AdminPanelLayout from '@/components/layouts/AdminPanelLayout/AdminPanelLayout'
import UserDetails from '@/components/templates/p-admin/users/UserDetails';
import connectToDB from '@/configs/db';
import UserModel from "@/models/User"


async function page({params}) {

connectToDB()
    const UserID = params.id;
    const user = await UserModel.findOne({_id: UserID})
    
    

  return (
    <AdminPanelLayout>
      <UserDetails  user={JSON.parse(JSON.stringify(user))}    />
    </AdminPanelLayout>
  )
}

export default page
