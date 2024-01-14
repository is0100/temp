import express from 'express';
import {
  getTopSellerProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  purchaseProduct,
  importProductsCSV,
} from '../controllers/productController.js';
import { protect, isSeller } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/top-sellers', isSeller, getTopSellerProducts);
router.get('/', getAllProducts);    //http://localhost:6969/api/products
router.post('/', protect, isSeller, createProduct);  //http://localhost:6969/api/products
router.put('/:id', protect, isSeller, updateProduct);
router.delete('/:id', protect, isSeller, deleteProduct);
router.post('/:id/purchase', protect, purchaseProduct);
router.post('/import-csv', protect, isSeller, importProductsCSV);

export default router;
