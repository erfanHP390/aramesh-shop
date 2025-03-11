import UserPanelLayout from "@/components/layouts/UserPanelLayout/UserPanelLayout"
import SendTicket from "@/components/templates/p-user/tickets/SendTicket"

function page() {
  return (
    <UserPanelLayout>
      <SendTicket />
    </UserPanelLayout>
  )
}

export default page