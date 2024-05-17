import createHttpError from "http-errors";
import ConversationModel from "../models/conversation.model";
import UserModel from "../models/user.model";
import MessageModel from "../models/message.model";

export const createMessage = async (data: any) => {
  let newConvo = await MessageModel.create(data);
  if (!newConvo)
    throw createHttpError.BadGateway("Oops... Something wrong happened");
  return newConvo;
};

export const getConvoMessages = async (conversation: any) => {
  let message = await MessageModel.find({
    conversation
  })
    .populate("sender", "name picture email status")
    .populate("conversation")
    .sort({updateAt:-1});

  if (!message)
    throw createHttpError.BadGateway("Oops... Something wrong happened");

  return message;
};
export const populateMessage = async (id: any) => {
  let populateMsg = await MessageModel.findById(id).populate({
    path: "sender",
    select:"name picture",
    model:"UserModel"
  }).populate({
    path: "conversation",
    select:"name picture isGroup users",
    model:"ConversationModel",
    populate:{
      path: "users",
    select:"name picture email status",
    model:"UserModel"
    }
  });
  if (!populateMsg)
    throw createHttpError.BadGateway("Oops... Something wrong happened");

  return populateMsg;
};

