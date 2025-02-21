// const { MongoClient } = require("mongodb");
// require("dotenv").config();

// const url = process.env.MONGO_URL;
// const client = new MongoClient(url);
// const dbName = "HTM";

// // Add product to cart
// const addToCart = async (req, res) => {
//   const { productId, imageURL, price, title, quantity } = req.body;
//   const userId = req.user.id; // Assuming user ID is set in the middleware
//   const qty = quantity ? parseInt(quantity) : 1;

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const cartCollection = db.collection("carts");

//     // Check if the cart for this user already exists
//     const cart = await cartCollection.findOne({ userId });

//     if (cart) {
//       // If the product is already in the cart, update the quantity
//       const productIndex = cart.products.findIndex(
//         (p) => p.productId === productId
//       );
//       if (productIndex > -1) {
//         cart.products[productIndex].quantity += qty;
//       } else {
//         // Add new product with all the details
//         cart.products.push({ productId, imageURL, price, title, quantity: qty });
//       }
//       await cartCollection.updateOne({ userId }, { $set: { products: cart.products } });
//     } else {
//       // If no cart exists for the user, create a new one with the product
//       await cartCollection.insertOne({
//         userId,
//         products: [{ productId, imageURL, price, title, quantity: qty }],
//       });
//     }

//     res.status(200).json({ message: "Product added to cart successfully" });
//   } catch (e) {
//     console.error(`Error: ${e}`);
//     res.status(500).json({ message: "Error adding product to cart" });
//   } finally {
//     await client.close();
//   }
// };

// // Get cart items for a user
// const getCart = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const cartCollection = db.collection("carts");

//     // Find the cart for the user
//     const cart = await cartCollection.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     res.status(200).json(cart);
//   } catch (e) {
//     console.error(`Error: ${e}`);
//     res.status(500).json({ message: "Error fetching cart" });
//   } finally {
//     await client.close();
//   }
// };

// // Remove a product from the cart
// const removeFromCart = async (req, res) => {
//   const { productId } = req.body;
//   const userId = req.user.id;

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const cartCollection = db.collection("carts");

//     const cart = await cartCollection.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // Remove the product from the cart
//     cart.products = cart.products.filter((p) => p.productId !== productId);

//     await cartCollection.updateOne({ userId }, { $set: { products: cart.products } });

//     res.status(200).json({ message: "Product removed from cart successfully" });
//   } catch (e) {
//     console.error(`Error: ${e}`);
//     res.status(500).json({ message: "Error removing product from cart" });
//   } finally {
//     await client.close();
//   }
// };

// module.exports = { addToCart, getCart, removeFromCart };

// cart_controller.js
const { connectToDatabase } = require('./db');

// Add product to cart
const addToCart = async (req, res) => {
  const { productId, imageURL, price, title, quantity } = req.body;
  const userId = req.user.id;
  const qty = quantity ? parseInt(quantity) : 1;

  try {
    const db = await connectToDatabase();
    const cartCollection = db.collection("carts");

    const cart = await cartCollection.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += qty;
      } else {
        cart.products.push({ productId, imageURL, price, title, quantity: qty });
      }
      await cartCollection.updateOne({ userId }, { $set: { products: cart.products } });
    } else {
      await cartCollection.insertOne({
        userId,
        products: [{ productId, imageURL, price, title, quantity: qty }]
      });
    }

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

// Get cart items for a user
const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const db = await connectToDatabase();
    const cartCollection = db.collection("carts");

    const cart = await cartCollection.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const db = await connectToDatabase();
    const cartCollection = db.collection("carts");

    const cart = await cartCollection.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(p => p.productId !== productId);

    await cartCollection.updateOne({ userId }, { $set: { products: cart.products } });

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (e) {
    console.error(`Error: ${e}`);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };
