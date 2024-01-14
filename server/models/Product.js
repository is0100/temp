import mongoose from 'mongoose';

// Function to generate a random 4-digit identifier
const generateUniqueId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  productID: { type: String, default: generateUniqueId, unique: true }, // Default value is the generated unique identifier
});

const Product = mongoose.model('Product', productSchema);

export default Product;
