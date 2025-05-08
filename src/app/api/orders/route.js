import connectToDB from "@/configs/db";
import { validateEmail, validatePhone } from "@/utils/auth";
import OrdersModel from "@/models/Orders";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      firstName,
      lastName,
      company,
      province,
      city,
      address,
      postCode,
      mobile,
      email,
      description,
      totalPrice,
      postPrice,
      basket,
      products,
      orderCode,
      isPay,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !province ||
      !city ||
      !address ||
      !postCode ||
      !mobile ||
      !email ||
      !totalPrice ||
      !postPrice ||
      !basket ||
      !products ||
      !orderCode
    ) {
      return Response.json(
        { message: "please fill all fields expect company and description" },
        { status: 400 }
      );
    }

    const isValidPhone = validatePhone(mobile);
    if (!isValidPhone) {
      return Response.json(
        { message: "phone is not valid" },
        {
          status: 422,
        }
      );
    }

    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return Response.json(
        { message: "email is not valid" },
        {
          status: 422,
        }
      );
    }

    await OrdersModel.create({
      firstName,
      lastName,
      company,
      province,
      city,
      address,
      postCode,
      mobile,
      email,
      description,
      totalPrice,
      postPrice,
      basket,
      products,
      orderCode,
      isPay,
    });

    for (const item of basket) {
      const productId = item.id;
      const count = item.count;

      if (mongoose.Types.ObjectId.isValid(productId)) {
        await ProductModel.findByIdAndUpdate(
          productId,
          { $inc: { uses: count } },
          { new: true }
        );
      }
    }

    return Response.json(
      { message: "order is created successfully" },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json(
      { message: `interval error server ${err}` },
      {
        status: 500,
      }
    );
  }
}
