import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
// import { cookies } from "next/headers";
// import UserModel from "@/models/User"
// import connectToDB from "@/configs/db";


const hashPassword = async (password) => {
  const hashedPassword = hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const generateAccessToken = (data) => {
  const token = sign({ ...data }, process.env.PRIVATEKEY , {
    expiresIn: "60d"
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const tokenPayload = verify(token, process.env.PRIVATEKEY);
    return tokenPayload;
  } catch (err) {
    console.log("access token verify is err", err);
    return false;
  }
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.RefreshTokenSecretKey , {
    expiresIn: "15d"
  });
  return token;
};

const validatePhone = (phone) => {
  const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g
  return regexPhone.test(phone)
}

const validateEmail = (email) => {
  const regexEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  return regexEmail.test(email)
}

const validatePassword = (password) => {
  const regexPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g
  return regexPass.test(password)
}

// const authUser = async () => {

//   connectToDB()

//   const token = cookies().get("token")
//   let user = null

//   if (token) {
//     const tokenPayload = verifyToken(token.value);
//     if (tokenPayload) {
//       user = await UserModel.findOne({ email: tokenPayload.email });
//     }
//   }

//   return user;

// }

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
  validatePhone,
  validateEmail,
  validatePassword,
  // authUser
};
