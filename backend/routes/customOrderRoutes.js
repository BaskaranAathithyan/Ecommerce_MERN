import express from "express";
import expressAsyncHandler from "express-async-handler";
import CustomOrder from "../models/CustomOrderModel.js";
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
    const customOrder = await newCustomOrder.save();
    res.status(201).send({ message: "New custom Order Created", customOrder });
  })
);

export default customOrderRouter;
