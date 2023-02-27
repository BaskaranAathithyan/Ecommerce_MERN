import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin, generateToken } from "../utils.js";

const customOrderRouter = express.Router();

customOrderRouter.post(
  "/customorders",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newCustomOrder = new CustomOrder({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,
      description: req.body.description,
    });
    const CustomOrder = await newCustomOrder.save();
  })
);

export default customOrderRouter;
