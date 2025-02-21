import express from "express";
import {
  createMenu,
  getAllMenus,
  getMenuById,
  deleteMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/", createMenu);
router.get("/", getAllMenus);
router.get("/:id", getMenuById);
router.delete("/:id", deleteMenu);

export default router;
