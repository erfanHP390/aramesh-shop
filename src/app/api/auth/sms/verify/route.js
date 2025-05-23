import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp";
import { generateRefreshToken, validatePhone } from "@/utils/auth";
import UserModel from "@/models/User";
import { generateAccessToken } from "@/utils/auth";
import { roles } from "@/utils/constants";
import BanModel from "@/models/Ban"


export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { phone, code } = body;
    const email = `${phone}@gmail.com`;

    if (!phone || !code) {
      return Response.json(
        { message: "phone and code is required" },
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

    const otp = await OtpModel.findOne({ phone, code });
    const otpPhone = await OtpModel.findOne({ phone });
    const otpCode = await OtpModel.findOne({ code });

    if (!otpPhone) {
      return Response.json(
        { message: "phone is not found" },
        {
          status: 404,
        }
      );
    } else if (otp) {
      if (otp) {
        const date = new Date();
        const now = date.getTime();

        if (otp.expTime > now) {

          const isUserExist = await UserModel.findOne({phone})

          if(isUserExist) {
            const accessToken = generateAccessToken({email: isUserExist.email})
            const refreshToken = generateRefreshToken({email: isUserExist.email})
    
            await UserModel.findOneAndUpdate({phone} , {
                $set: {
                    refreshToken
                }
            })
    
            const headers = new Headers()
            headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`)
            headers.append("Set-Cookie", `refresh-token=${refreshToken};path=/;httpOnly=true`)
    
        
            return Response.json({message: "code is corrected for login"} , {
                status: 200,
                headers
            })
          } else {
            const accessToken = generateAccessToken({ email });

            const users = await UserModel.find({});
  
            await UserModel.create({
              phone,
              email,
              role: users.length > 0 ? roles.USER : roles.ADMIN,
            });
  
            return Response.json(
              { message: "code is corrected for sign-up" },
              {
                status: 200,
                headers: {
                  "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`,
                },
              }
            );
          }


        } else {
          return Response.json({ message: "code is expired" }, { status: 410 });
        }
      } else {
        return Response.json(
          { message: "code is not found" },
          {
            status: 404,
          }
        );
      }
    } else {
      if (!otpCode) {
        if (otpPhone.times === 3) {
          setTimeout(async () => {
            await OtpModel.findOneAndDelete({ phone });
          }, 300000);

          return Response.json(
            { message: "you have many try please try again later" },
            {
              status: 429,
            }
          );
        }

        await OtpModel.findOneAndUpdate(
          { phone },
          {
            $inc: {
              times: 1,
            },
          }
        );
      }
      return Response.json(
        { message: "code is not correct or is invalid" },
        { status: 419 }
      );
    }
  } catch (err) {
    return Response.json(
      { message: `interval error ${err}` },
      {
        status: 500,
      }
    );
  }
}
