import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
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

      return Response.json(
        { message: "discount removed successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    return Response.json(
      { message: `interval error server => ${err}` },
      {
        status: 500,
      }
    );
  }
}
