import { Schema, model, models } from "mongoose";

const ObjectId=Schema.ObjectId
const conversationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Conversation is required.'],
        trim: true,
    },
   
    isGroup: {
        type: Boolean,
        required: true,
        default:false
    },
    users: [{
        type: ObjectId,
        ref:"UserModel"
    }],
    latestMessage: {
        type: ObjectId,
        ref:"MessageModel"
    },
    admin:[{
        type: ObjectId,
        ref:"UserModel"
    }]

}, {
    timestamps: true,
});

const ConversationModel = models.ConversationModel || model('ConversationModel', conversationSchema);

export default ConversationModel