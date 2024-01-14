import Product from '../models/Product.js';
import User from '../models/User.js';
import csv from 'csv-parser';
import fs from 'fs';

export const getTopSellerProducts = async (req, res) => {
  try {
    // Implement logic to get top seller products
    const topSellerProducts = await Product.find({}).sort({ soldCount: -1 }).limit(5);

    res.json({ topSellerProducts });
  } catch (error) {
    console.error('Error fetching top seller products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // Implement logic to get all products
    const allProducts = await Product.find({});

    res.json({ allProducts });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Get the user information from the authenticated user
    const { username } = req.user;

    // Create a new product with the owner set to the username
    const newProduct = new Product({
      name,
      description,
      price,
     // Set the owner to the username from JWT token
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price } = req.body;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product details
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;

    await existingProduct.save();

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product
    await existingProduct.remove();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const purchaseProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already purchased
    if (product.buyer) {
      return res.status(400).json({ message: 'Product is already purchased' });
    }

    // Update the product with the buyer's ID
    product.buyer = req.user._id;
    await product.save();

    res.json({ message: 'Product purchased successfully' });
  } catch (error) {
    console.error('Error purchasing product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const importProductsCSV = async (req, res) => {
  try {
    const { filePath } = req.body;

    // Read CSV file and import products
    const products = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Customize this part based on your CSV structure
        products.push({
          name: row.name,
          description: row.description,
          price: row.price,
          seller: req.user._id,
        });
      })
      .on('end', async () => {
        // Insert products into the database
        await Product.insertMany(products);

        res.json({ message: 'Products imported successfully' });
      });
  } catch (error) {
    console.error('Error importing products from CSV:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
