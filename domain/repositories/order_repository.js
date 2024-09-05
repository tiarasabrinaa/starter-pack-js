// npm install mongoose uuid

const Order = require('../models/order_model');

// Function to save a new order
async function create(order) {
  try {
    // Create a new order
    const newOrder = new Order(order);

    // Save the order to the database
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Function to get an order by order id
async function getOneByOrderId(orderId) {
  try {
    const order = await Order.findOne({ order_id: orderId });
    return order;
  } catch (error) {
    console.error('Error getting order by order_id:', error);
    throw error;
  }
}

// Function to find all orders
async function findAll() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error('Error finding orders:', error);
    throw error;
  }
}

async function updateOne(orderId, updateData) {
  try {
    const existingOrder = await Order.findOne({ order_id: orderId });
    
    if (!existingOrder) {
      return -1;
    }

    delete updateData._id;
    Object.assign(existingOrder, updateData);

    // Set the updated_at field to the current time
    existingOrder.updated_at = new Date();

    const updatedOrder = await existingOrder.save();
    return updatedOrder;
  } catch (error) {
    console.error('Error updating Order:', error);
    throw error;
  }
}

const deleteOneById = async (orderId) => {
  try {
      const result = await Order.deleteOne({ order_id: orderId });
      return result;
  } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
  }
};

module.exports = { create, getOneByOrderId, findAll, deleteOneById, updateOne };