import UserPanelLayout from '@/components/layouts/UserPanelLayout/UserPanelLayout'
import AllTickets from '@/components/templates/p-user/tickets/allTickets/AllTickets'
import connectToDB from '@/configs/db'
import { authUser } from '@/utils/authUserLink'
import TicketModel from "@/models/Ticket"

async function page() {

    connectToDB()
    const user = await authUser()
    const tickets = await TicketModel.find({user: user._id}).populate(["department" , "subDepartment"] , "title")

    

  return (
    <UserPanelLayout>
      <AllTickets  tickets={JSON.parse(JSON.stringify(tickets))} />
    </UserPanelLayout>
  )
}

export default page
