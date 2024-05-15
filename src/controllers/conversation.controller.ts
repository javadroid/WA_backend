import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import createHttpError from "http-errors";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
  verifyToken,
} from "../services/auth.service";
import logger from "../configs/logger";
import {
  createConversaction,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service";

export const createOpenConversation = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { receiver_id } = req.body;
    const sender_id = req.user.userId;
    //check if receiver_id is provided
    if (!receiver_id) {
      throw createHttpError.BadGateway(
        "please provide the user id you wanna start a conversation to."
      );
    }

    //check if conversation is exists
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );
    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let receiver_user = await getUser(receiver_id);
      let convoData = {
        name: receiver_user.name,
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversaction(convoData);
      const populateConvo=await populateConversation(newConvo._id,"users","-password")
      res.json(populateConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req: any, res: any, next: any) => {
  try {
    const user_id=req.user.userId
    const conversation=await getUserConversations(user_id)
    res.status(200).json(conversation)
  } catch (error) {
    next(error);
  }
};

