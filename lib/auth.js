import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET =
  "247692724a66bd10331d3791fa2553b638593dcf29e03d2e82d44d7435e069bd7d963ae91c494fb7d90769d719607e76af84ee93224badc50dd0d77e01048d2fa6cf145b1611959c8ce0ed332be1742a4e01ba127029228114f17c35e7fceb9b660ff3b0f62b95d2b27b0684c46d1e88a752ff16c62f06d676a497f0846f02c2faeff6be51f9b0bd085cd2c3bb4a7277a32b4b50ca0dce608a501434c19df13505f0f38a27ec7630463f1c72a2fe72c2abc71a9562a169646117323382bef31461e83d7ec7eb5e6e39238ca169362311f379e32a4a31ee81c640ed7dd3db9d79eafa3fc0169327f2c1a803a696f9ec54831cd2c3ecd411c6d73242059a494f4b";

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const verifyPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const createToken = (user) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
