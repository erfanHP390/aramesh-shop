import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import TicketModel from "@/models/Ticket";

export async function POST(req) {

    try {
        connectToDB();
        const user = await authUser();
        const reqBody = await req.json();
        const { title, body, department, subDepartment, priority } = reqBody;
      
        if (!user) {
          return Response.json({ message: "user not found" }, { status: 404 });
        }
      
        if (!title || !body || !department || !subDepartment || !priority) {
          return Response.json(
            { message: "please fill all fields" },
            {
              status: 400,
            }
          );
        }
      
        await TicketModel.create({
          title,
          body,
          department,
          subDepartment,
          priority,
          user: user._id,
        });
      
      
        return Response.json({message: "ticket is created successfully"} , {
          status: 201
        })
      
    } catch (err) {
        return Response.json({message: `interval error server => ${err}`} , {status: 500})
    }

}
