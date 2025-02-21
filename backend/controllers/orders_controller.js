const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const { connectToDatabase } = require('./db');
 
exports.placeOrder = async (req, res) => {
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();
        const cartCollection = db.collection('carts');
        const orderCollection = db.collection('orders');
        const productCollection = db.collection('products');

        const cart = await cartCollection.findOne({ userId });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        const productIds = cart.products.map(p => new ObjectId(`${p.productId}`));
        const products = await productCollection.find({ _id: { $in: productIds } }).toArray();

        let totalAmount = 0;
        const orderItems = cart.products.map(cartItem => {
            const product = products.find(p => p._id.equals(cartItem.productId));
            if (product) {
                totalAmount += product.price * cartItem.quantity;
                return {
                    productId: product._id,
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                };
            }
        });

        const newOrder = {
            userId,
            orderItems,
            totalAmount,
            status: 'Pending',
            orderedAt: new Date()
        };

        const result = await orderCollection.insertOne(newOrder);
        await cartCollection.updateOne({ userId }, { $set: { products: [] } });

        res.status(201).json({ message: 'Order placed successfully', orderId: result.insertedId });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({ message: 'Error placing order', error: e.message });
    } 
};

exports.getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();
        const orderCollection = db.collection('orders');

        const orders = await orderCollection.find({ userId }).toArray();

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({ message: 'Error fetching orders' });
    } 
};

exports.cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;

    try {
        const db = await connectToDatabase();
        const orderCollection = db.collection('orders');

        const order = await orderCollection.findOne({ _id: new ObjectId(`${orderId}`), userId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status !== 'Pending') {
            return res.status(400).json({ message: 'Only pending orders can be canceled' });
        }

        await orderCollection.updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { status: 'Canceled' } }
        );

        res.status(200).json({ message: 'Order canceled successfully' });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.status(500).json({ message: 'Error canceling order', error: e.message });
    } 
};
