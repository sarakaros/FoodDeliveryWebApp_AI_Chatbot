import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        // checking if user exists
        const user = await userModel.findOne({email});
        if (!user) {    
            return res.json({success: false, message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = createToken(user._id);
        res.json({success: true, token}); 

        console.log("login user " + req.body);
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});

    }
}
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
 const {name, password, email} = req.body;
    try {
        // checking if user already exists
        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({success: false, message: "User already exists"});
        }   
        // validating email format & password strength
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"});
        }

        // hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success: true, token});
            
    }catch (error) {
        console.error(error);
        res.json({success: false, message: "Error"});

    }
}

//get info 
const getUserInfo = async (req, res) => {
    try {
        const token = req.headers.token;
        console.log("user controller token: " + token);
        if (!token) return res.json({ success: false, message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password -__v -cartData');
        if (!user) return res.json({ success: false, message: "User not found" });

        res.json({ success: true, user });

    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Invalid token" });
    }
};

// update user info
const updateUserInfo = async (req, res) => {
    try {
        const token = req.headers.token;
        if (!token) return res.json({ success: false, message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { name, email, password, birthday, gender, phone } = req.body;

        const updateData = {
            name,
            birthday,
            gender,
            phone
        };

        if (password && password.length >= 8) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password -__v -cartData');

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Failed to update user" });
    }
};


export { loginUser, registerUser, getUserInfo, updateUserInfo };