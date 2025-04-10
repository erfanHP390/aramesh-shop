const { default: connectToDB } = require("@/configs/db");
const { cookies } = require("next/headers");
const { verifyToken } = require("./auth");
import UserModel from "@/models/User";

const authUser = async () => {
  connectToDB();

  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });

      if (user) {
        user = JSON.parse(JSON.stringify(user));
      }
    }
  }

  return user;
};

const authAdmin = async () => {
  connectToDB();
  const token = cookies().get("token");
  let user = null;

  if (token) {
    const tokenPayload = verifyToken(token.value);
    if (tokenPayload) {
      user = await UserModel.findOne({ email: tokenPayload.email });
      if (user.role === "ADMIN") {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }

  return user;
};
export { authUser, authAdmin };
