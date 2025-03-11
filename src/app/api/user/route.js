import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import UserModel from "@/models/User";
import { validateEmail, validatePhone } from "@/utils/auth";

export async function POST(req) {
  try {
    connectToDB();

    const user = await authUser();
    const body = await req.json();
    const { name, email, phone } = body;

    if ((!name, !email, !phone)) {
      return Response.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return Response.json({ message: "Invalid email" }, { status: 422 });
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json({ message: "Invalid phone" }, { status: 422 });
    }


    await UserModel.findOneAndUpdate({_id: user._id} , {
        $set: {
            name,
            email,
            phone
        }
    })

    return Response.json({message: "user-info updated successfully"} , {
        status: 200
    })


  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
