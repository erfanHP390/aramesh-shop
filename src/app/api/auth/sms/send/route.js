import connectToDB from "@/configs/db";
import { validatePhone } from "@/utils/auth";
const request = require("request");
import OtpModel from "@/models/Otp";
import UserModel from "@/models/User";
import BanModel from "@/models/Ban"

export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return Response.json(
        { message: "phone have be send" },
        {
          status: 400,
        }
      );
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return Response.json(
        { message: "phone is not valid" },
        {
          status: 422,
        }
      );
    }

    const banPhone = await BanModel.findOne({phone})
    if(banPhone) {
      return Response.json({message: "phone is banned"} , {
        status: 403
      })
    }


    const now = new Date();
    const expTime = now.getTime() + 180_000;

    const code = Math.floor(Math.random() * 99999);

    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "u09962939286",
          pass: "Faraz@1971700890643903",
          fromNum: "3000505",
          toNum: phone,
          patternCode: "vc9knj840ssiwl0",
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          await OtpModel.create({ phone, code, expTime });

          console.log(response.body);
        } else {
          console.log("whatever you want");
        }
      }
    );

    return Response.json(
      { message: "code sent successfully" },
      {
        status: 201,
      }
    );
  } catch (err) {
    return Response.json(
      { message: `interval error ${err}` },
      {
        status: 500,
      }
    );
  }
}
