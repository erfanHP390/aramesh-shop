import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { hashPassword, validatePhone } from "@/utils/auth";
const request = require("request");
import BanModel from "@/models/Ban";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return Response.json(
        { message: "phone number is required" },
        { status: 400 }
      );
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json(
        { message: "phone number is not valid" },
        { status: 422 }
      );
    }

    const banPhone = await BanModel.findOne({ phone });
    if (banPhone) {
      return Response.json(
        { message: "phone is banned" },
        {
          status: 403,
        }
      );
    }

    const user = await UserModel.findOne({ phone });

    if (!user) {
      return Response.json({ message: "user is not found" }, { status: 404 });
    }

    const code = Math.floor(Math.random() * 99999);

    const newPassword = await hashPassword(String(code));

    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "u09962939286",
          pass: "Faraz@1971700890643903",
          fromNum: "3000505",
          toNum: phone,
          patternCode: "dodyqfs8d9v7154",
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          await UserModel.findOneAndUpdate(
            { phone },
            {
              $set: {
                password: newPassword,
              },
            }
          );
          console.log(response.body);
        } else {
          console.log("whatever you want");
        }
      }
    );

    return Response.json(
      { message: "password is changed successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { message: `interval error server => ${err}` },
      {
        status: 500,
      }
    );
  }
}
