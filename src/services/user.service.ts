import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../configs/logger";
import createHttpError from "http-errors";

export const searchUsers = async (keyword: any) => {
  let user = await UserModel.find({

    $or:[
      {name: { $regex: keyword, $options: "i" },},
      // {email: { $regex: keyword, $options: "i" },}
    ]
    
  });
  return user;
};
