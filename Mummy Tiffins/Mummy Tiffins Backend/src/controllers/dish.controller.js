import prisma from "../../helpers/prisma.js";

export const createDish = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "Name and price are required." });
    }

    const newDish = await prisma.dishes.create({
      data: { name, price },
    });

    res.status(201).json(newDish);
  } catch (error) {
    console.error("Error creating dish:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const getAllDishes = async (req, res) => {
  try {
    const dishes = await prisma.dishes.findMany();
    res.json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;

    // Remove dish from menus before deleting
    await prisma.menuDishes.deleteMany({ where: { dishId: id } });
    await prisma.dishes.delete({ where: { id } });

    res.json({ message: "Dish deleted successfully." });
  } catch (error) {
    console.error("Error deleting dish:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
