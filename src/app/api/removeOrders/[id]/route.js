import connectToDB from "@/configs/db";
import OrderModel from "@/models/Orders";
import { authAdmin } from "@/utils/authUserLink";
import { isValidObjectId } from "mongoose";

export async function DELETE(req, { params }) {
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

    const id = params.id;

    if (!id) {
      return Response.json(
        { message: "must send one code" },
        {
          status: 400,
        }
      );
    }

    if (!isValidObjectId(id)) {
      return Response.json({ message: "id is not valid" }, { status: 422 });
    }

    const userOrder = await OrderModel.findOne({ _id: id });

    if (!userOrder) {
      return Response.json(
        { message: "userOrder not found" },
        {
          status: 404,
        }
      );
    }

    await OrderModel.findOneAndDelete({ _id: id });

    return Response.json({ message: "order deleted successfully" });
  } catch (err) {
    return Response.json(
      { message: `interval error server => ${err}` },
      {
        status: 500,
      }
    );
  }
}
