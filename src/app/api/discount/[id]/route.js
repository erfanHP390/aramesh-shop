import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import { isValidObjectId } from "mongoose";

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    const id = params.id;

    if (!id) {
      return Response.json(
        { message: "must send one id" },
        {
          status: 400,
        }
      );
    }

    if (!isValidObjectId(id)) {
      return Response.json(
        { message: "id is not valid" },
        {
          status: 422,
        }
      );
    }

    const discount = await DiscountModel.findOne({ _id: id });

    if (!discount) {
      return Response.json(
        { message: "discount not found" },
        {
          status: 404,
        }
      );
    }

    await DiscountModel.findOneAndDelete({ _id: id });

    return Response.json({ message: "discount removed successfully" });
  } catch (err) {
    return Response.json(
      { message: `interval error server => ${err}` },
      {
        status: 500,
      }
    );
  }
}
