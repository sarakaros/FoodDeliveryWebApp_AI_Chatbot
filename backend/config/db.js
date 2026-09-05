import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vanb2203592:khanhvanA1!@cluster0.twp9iko.mongodb.net/delivery-app').then(() => console.log("DB Connected"));
}