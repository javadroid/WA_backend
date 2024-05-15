import { Schema, model, models } from "mongoose";

const ObjectId=Schema.ObjectId
const conversationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Conversation is required.'],
        trim: true,
    },
   picture:{
    type: String,
    trim: true,
    default: "https://st3.depositphotos.com/6672868/13701/v/380/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"

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