import prisma from "../../helpers/prisma.js";


export const createMenu = async (req, res) => {
  try {
    const { name, price, dishes } = req.body;

    if (!name || !price || !Array.isArray(dishes)) {
      return res.status(400).json({ error: "Invalid input data." });
    }

    const newMenu = await prisma.menu.create({
      data: {
        name,
        price,
        dishes: {
          create: dishes.map((dishId) => ({
            dish: { connect: { id: dishId } },
          })),
        },
      },
      include: { dishes: true },
    });

    res.status(201).json(newMenu);
  } catch (error) {
    console.error("Error creating menu:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const getAllMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: { dishes: { include: { dish: true } } },
    });
    res.json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await prisma.menu.findUnique({
      where: { id },
      include: { dishes: { include: { dish: true } } },
    });

    if (!menu) {
      return res.status(404).json({ error: "Menu not found." });
    }

    res.json(menu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.menuDishes.deleteMany({ where: { menuId: id } }); // Cleanup relations first
    await prisma.menu.delete({ where: { id } });

    res.json({ message: "Menu deleted successfully." });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
