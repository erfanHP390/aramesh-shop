import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

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
    expiresIn: "60s"
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

export {
  hashPassword,
  verifyPassword,
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
};
