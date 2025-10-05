import connectToDB from "@/configs/db";
import { authAdmin, authUser } from "@/utils/authUserLink";
import TicketModel from "@/models/Ticket";

export async function POST(req) {
  try {
    connectToDB();

    const admin = await authAdmin();
    if (!admin) {
      return Response.json(
        { message: "this route is protected" },
        {
          status: 401,
        }
      );
    }

    if (
      admin.name === "ادمین" &&
      admin.email === "admin@email.com" &&
      admin.phone === "09991111212"
    ) {
      return Response.json(
        { message: "this route is protected" },
        { status: 403 }
      );
    } else {
      const reqBody = await req.json();
      const { title, body, department, subDepartment, priority, ticketID } =
        reqBody;

      const user = await authUser();

      const ticketUser = await TicketModel.findOneAndUpdate(
        { _id: ticketID },
        {
          $set: {
            hasAnswer: true,
          },
        }
      );

      await TicketModel.create({
        title,
        body,
        department,
        subDepartment,
        priority,
        user: user._id,
        hasAnswer: false,
        isAnswer: true,
        mainTicket: ticketID,
      });

      return Response.json(
        { message: "ticket was answered is successfully" },
        {
          status: 201,
        }
      );
    }
  } catch (err) {
    return Response.json(
      { message: `interval error server ${err}` },
      {
        status: 500,
      }
    );
  }
}
