import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import { authAdmin } from "@/utils/authUserLink";

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
      const body = await req.json();
      const { code, percent, maxUse } = body;

      if (!code || !percent || !maxUse) {
        return Response.json(
          { message: "all fields must be filled" },
          {
            status: 400,
          }
        );
      }

      await DiscountModel.create({ code, percent, maxUse });

      return Response.json(
        { message: "discount created successfully" },
        {
          status: 201,
        }
      );
    }
  } catch (err) {
    return Response.json(
      { message: `interval error server: ${err}` },
      {
        status: 500,
      }
    );
  }
}
