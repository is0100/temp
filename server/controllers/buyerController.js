import Product from '../models/Product.js';
import User from '../models/User.js';

export const getBuyerWalletBalance = async (req, res) => {
  try {
    const buyerId = req.user._id;

    // Fetch the buyer's wallet balance (this is just a placeholder, replace it with your logic)
    const buyer = await User.findById(buyerId);
    const walletBalance = buyer.walletBalance || 0;

    res.json({ walletBalance });
  } catch (error) {
    console.error('Error fetching buyer wallet balance:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllProductsForPurchase = async (req, res) => {
  try {
    // Fetch all products available for purchase
    const products = await Product.find({ buyer: null }); // Assuming null or undefined buyer means it's available

    res.json({ products });
  } catch (error) {
    console.error('Error fetching all products for purchase:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const purchaseProduct = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const productId = req.params.id;

    // Fetch the product
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already purchased
    if (product.buyer) {
      return res.status(400).json({ message: 'Product is already purchased' });
    }

    // Update the product with the buyer's ID
    product.buyer = buyerId;
    await product.save();

    // Deduct the product price from the buyer's wallet balance (this is just a placeholder, replace it with your logic)
    const buyer = await User.findById(buyerId);
    buyer.walletBalance = (buyer.walletBalance || 0) - product.price;
    await buyer.save();

    res.json({ message: 'Product purchased successfully' });
  } catch (error) {
    console.error('Error purchasing product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const refundProduct = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const productId = req.params.id;

    // Fetch the product
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is purchased by the buyer
    if (!product.buyer || product.buyer.toString() !== buyerId.toString()) {
      return res.status(400).json({ message: 'You did not purchase this product' });
    }

    // Refund the product (this is just a placeholder, replace it with your logic)
    product.buyer = null;
    await product.save();

    // Refund the product price to the buyer's wallet balance (this is just a placeholder, replace it with your logic)
    const buyer = await User.findById(buyerId);
    buyer.walletBalance = (buyer.walletBalance || 0) + product.price;
    await buyer.save();

    res.json({ message: 'Product refunded successfully' });
  } catch (error) {
    console.error('Error refunding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllPurchases = async (req, res) => {
  try {
    const buyerId = req.user._id;

    // Fetch all products purchased by the buyer
    const purchases = await Product.find({ buyer: buyerId });

    res.json({ purchases });
  } catch (error) {
    console.error('Error fetching buyer purchases:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
