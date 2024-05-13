import { Schema, model, models } from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    picture: {
        type: String,
        trim: true,
        default: "https://st3.depositphotos.com/6672868/13701/v/380/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],

    },
    access_token: {
        type: String,
    },
    status: {
        type: String,
        trim: true,
        default: 'Hey there! I am using whatsapp',
    },

}, {
    timestamps: true,
});

//   userSchema.pre("save",async (next:any)=>{
//     try {
//         if(this?.isNew){
//             const salt= await bcrypt.genSalt(10)
//             const hash= await bcrypt.hash(this?.password,salt)
//             this?.password = hash
//         }
//     } catch (error) {

//     }

//   })
const UserModel = models.UserModel || model('UserModel', userSchema);

export default UserModel