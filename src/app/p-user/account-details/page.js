import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import AccountDetail from '@/components/templates/p-user/accountDetail/AccountDetail'
import connectToDB from '@/configs/db'
import UserProfileModel from "@/models/UserProfile"
import { authUser } from '@/utils/authUserLink'


async function page() {

  connectToDB()
  const user =  await authUser()
  const profileUser = await UserProfileModel.findOne({user: user._id})

  return (
    <UserPanelLayout>
      <AccountDetail  profileUser={JSON.parse(JSON.stringify(profileUser))} />
    </UserPanelLayout>
  )
}

export default page
