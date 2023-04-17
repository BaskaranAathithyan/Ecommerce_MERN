import express from "express";
import CustomOrder from "../models/customOrderModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const customOrderRouter = express.Router();

customOrderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const customorders = await CustomOrder.find({});
    res.send(customorders);
  })
);

customOrderRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const newCustomOrder = new CustomOrder(req.body);
      const savedOrder = await newCustomOrder.save();
      res.json(savedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to save custom order." });
    }
  })
);

export default customOrderRouter;
