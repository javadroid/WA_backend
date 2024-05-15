import createHttpError from "http-errors";
import ConversationModel from "../models/conversation.model";
import UserModel from "../models/user.model";

export const doesConversationExist = async (
  sender_id: any,
  receiver_id: any
) => {
  let convo = await ConversationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convo)
    throw createHttpError.BadGateway("Oops... Something wrong happened");

  convo = await UserModel.populate(convo, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return convo[0];
};

export const createConversaction = async (data: any) => {
  let newConvo = await ConversationModel.create(data);
  if (!newConvo)
    throw createHttpError.BadGateway("Oops... Something wrong happened");
  return newConvo;
};

export const getUserConversations = async (user_id: any) => {
  let conversation = await ConversationModel.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({updateAt:-1});

  if (!conversation)
    throw createHttpError.BadGateway("Oops... Something wrong happened");

  conversation = await UserModel.populate(conversation, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return conversation;
};
export const populateConversation = async (
  id: any,
  fieldToPopulate: any,
  fieldsToRemove: any
) => {
  let populateConvo = await ConversationModel.findById(id).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populateConvo)
    throw createHttpError.BadGateway("Oops... Something wrong happened");

  return populateConvo;
};

export const updateLastestMessage = async (conco_id: any,message: any) => {
  let updatedConvo = await ConversationModel.findByIdAndUpdate(conco_id,{
    lastestMessage:message
  },{new:true});
  if (!updatedConvo)
    throw createHttpError.BadGateway("Oops... Something wrong happened");
  return updatedConvo;
};