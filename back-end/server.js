import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "../models/product.model.js";
import mongoose from 'mongoose';
import ProductRoutes from "../routes/product.route.js"

dotenv.config();

const app = express();

app.use(express.json()); //lets us accept JSON data in the req.body

app.use("/api/products", ProductRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("server started at http://localhost:5000" );
});
