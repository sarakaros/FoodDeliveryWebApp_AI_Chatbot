import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},    
    password: {type: String, required: true},
    birthday: { type: String, default: null },
    gender: { type: String, default: null },
    phone: { type: String, default: null },
    cartData: {type: Object,default:{}}
}, {minimize: false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
