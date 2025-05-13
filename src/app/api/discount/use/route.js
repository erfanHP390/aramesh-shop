import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import UserModel from "@/models/User";
import { isValidObjectId } from "mongoose";

export async function PUT(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { code, userId } = body;

    if (!code || !userId) {
      return Response.json(
        { message: "code and userId must be sent" },
        {
          status: 400,
        }
      );
    }

    if (!userId || !isValidObjectId(userId)) {
      return res.status(401).json({ message: "لطفاً وارد حساب کاربری شوید" });
    }

    const discount = await DiscountModel.findOne({ code });

    if (!discount) {
      return Response.json(
        { message: "code not found" },
        {
          status: 404,
        }
      );
    }

    if (discount.uses >= discount.maxUse) {
      return Response.json(
        { message: "code is expired" },
        {
          status: 422,
        }
      );
    }

    if (discount.usedBy && discount.usedBy.includes(userId)) {
      return Response.json(
        { message: "you have already used this code" },
        {
          status: 419,
        }
      );
    }

    await DiscountModel.findOneAndUpdate(
      { code },
      {
        $inc: { uses: 1 },
        $push: { usedBy: userId },
      }
    );

    return Response.json(discount);
  } catch (err) {
    return Response.json(
      { message: `interval error ${err}` },
      {
        status: 500,
      }
    );
  }
}
