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
  updateLastestMessage,
} from "../services/conversation.service";
import { createMessage,getConvoMessages,populateMessage } from "../services/message.service";

export const sendMessage = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const { message,convo_id,files } = req.body;
    const user_id = req.user.userId;
   
    if (!convo_id||(!message && !files)) {
      throw createHttpError.BadGateway(
        "please provide  a conversation id and a message"
      );
    }
    let user_user = await getUser(user_id);
      let msgData = {
        sender: user_id,
        message,
        conversation: convo_id,
      };
      const newMessage = await createMessage(msgData);
     
    const updatedMessage= await updateLastestMessage(convo_id,message)
    console.log(updatedMessage)
    const populateMsg=await populateMessage(newMessage._id)
      res.json(populateMsg);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req: any, res: any, next: any) => {
  try {
    const convo_id=req.params.convo_id
    if (!convo_id) {
      throw createHttpError.BadGateway(
        "please provide  a conversation id in the param"
      ); 
    }
    const msgs=await getConvoMessages(convo_id)
    res.status(200).json(msgs)
  } catch (error) {
    next(error);
  }
};

