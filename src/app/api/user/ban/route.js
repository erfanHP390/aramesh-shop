import connectToDB from "@/configs/db";
import { validateEmail, validatePhone } from "@/utils/auth";
import BanModel from "@/models/Ban";
import { authAdmin } from "@/utils/authUserLink";

export async function POST(req) {
  connectToDB();

  try {
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
      const { email, phone } = body;

      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        return Response.json(
          { message: "email is not valid" },
          {
            status: 422,
          }
        );
      }

      const isValidPhone = validatePhone(phone);
      if (!isValidPhone || !isValidEmail) {
        return Response.json(
          { message: "phone is not valid" },
          {
            status: 422,
          }
        );
      }

      await BanModel.create({ email, phone });

      return Response.json(
        { message: "user banned successfully" },
        {
          status: 200,
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
