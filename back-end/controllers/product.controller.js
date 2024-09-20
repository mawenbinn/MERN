import Product from "../../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req,res) => { //Retrieve all Product Function
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.log("error in fetching products",error);
        res.status(500).json({success:false, message: "Server Error"});
    }

}

export const createProducts = async (req,res) => { //Create Product Function
    const product = req.body //user sends this data
    if(!product.name || !product.price || !product.image){ //check to see if all fields is filled
        return res.status(400).json({success:false, message: "Provide all fields"}); //return error if not
    }

    const newProduct = new Product(product) //use the schema to create new product

    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    }   catch (error)   {
        console.error("Error in Creating Product", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
} 

export const updateProduct = async (req,res) => { //UPDATE FUNCTION 

    const {id} = req.params; //retrieve id from request parameters 
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) { //check if id is valid in mongodb
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}); //update according to ID 
        res.status(200).json({success: true, data:updatedProduct});
    } catch (error) {
        console.log("error in updating products",error);
        res.status(500).json({success:false, message: "Server Error"});
    }

}

export const deleteProduct = async (req, res) =>{ //Delete FUNCTION 
    const {id} = req.params;
    console.log("id:", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product Deleted"});
    } catch (error) {
        res.status(404).json({success:false, message:"Product Not Found"})
    }
}