import connectToDB from "@/configs/db"
import { authUser } from "@/utils/authUserLink"
import TicketModel from "@/models/Ticket"


export async function POST(req) {
    
    try {

        connectToDB()

        const reqBody = await req.json()
        const {title , body , department , subDepartment , priority , ticketID} = reqBody

        const user = await authUser()

        const ticketUser = await TicketModel.findOneAndUpdate({_id: ticketID} , {
            $set: {
                hasAnswer: true
            }
        })



        await TicketModel.create({
            title,
            body,
            department,
            subDepartment,
            priority,
            user: user._id,
            hasAnswer: false,
            isAnswer: true,
            mainTicket: ticketID
        })

        return Response.json({message: "ticket was answered is successfully"} , {
            status: 201
        })

    } catch (err) {
        return Response.json({message: `interval error server ${err}`} , {
            status: 500
        })
    }

}
