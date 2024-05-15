import { Schema, model, models } from "mongoose";

const ObjectId=Schema.ObjectId
const messageSchema = new Schema({
    message: {
        type: String,
        trim: true,
    },
   
    sender: {
        type: ObjectId,
        ref:"UserModel"
    },
    conversation: {
        type: ObjectId,
        ref:"ConversationModel"
    },
    file:[]

}, {
    timestamps: true,
});

const MessageModel = models.MessageModel || model('MessageModel', messageSchema);

export default MessageModel