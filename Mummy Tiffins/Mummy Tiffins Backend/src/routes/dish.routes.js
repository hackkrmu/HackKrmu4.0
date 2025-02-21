import express from "express";
import {
  createDish,
  getAllDishes,
  deleteDish,
} from "../controllers/dish.controller.js";

const router = express.Router();

router.post("/", createDish);
router.get("/", getAllDishes);
router.delete("/:id", deleteDish);

export default router;
