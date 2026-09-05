import { privateDecrypt } from "crypto";
import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item
const addFood = async (request, response) => {
    let image_filename = `${request.file.filename}`;
    const food = new foodModel({
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        category: request.body.category,
        image:image_filename
    });
    try {
        await food.save();
        response.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        response.json({success:false,message:"Error"});
    }
}

// list all food
// const listFood = async (req, res) => {
//     try {
//         const food = await foodModel.find({});
//         res.json({success:true, data:food})
//     } catch (e) {
//         console.log(e);
//         res.json({success:false, message: "error"});
//     }
// }

const listFood = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";

        const food = await foodModel.find({
            name: { $regex: searchQuery, $options: "i" }
        });

        res.json({ success: true, data: food });
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "error" });
    }
};


// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Removed"});
    } catch (e) {
        console.log(e);
        res.json({success:false, message: "error"});
    }
}

//update food items 
const updateFood = async (req, res) => {
    try {
        const { id, name, category, price } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Missing food ID." });
        }

        const food = await foodModel.findById(id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found." });
        }

        if (name) food.name = name;
        if (category) food.category = category;
        if (price) food.price = price;
        if (req.file) {
            food.image = req.file.filename;
        }

        await food.save();

        res.status(200).json({ success: true, message: "Food item updated." });
    } catch (e) {
        console.log(e);
        res.json({success:false, message: "error"});
    }
}

export {addFood, listFood, removeFood, updateFood};