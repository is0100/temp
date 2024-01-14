import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 6969;

// Connect to MongoDB
mongoose.connect("mongodb+srv://vivekgehlotscsebtech:Vivek123@cluster0.gdoamg4.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(cors());
app.use(express.json());

// Define your routes after the database connection is established
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import buyerRoutes from './routes/buyerRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/buyer', buyerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
