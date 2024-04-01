import { Schema, model,models } from "mongoose";

const userSchema= new Schema({
    userName:String,
    email:String,      
    voterID: String,
    dateOfBirth: Date,
    place: String,
    bloodroup:String,
    gender: String,
        
})

const User = models.User || model('User', userSchema);

export default User;
