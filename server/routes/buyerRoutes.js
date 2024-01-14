// buyerRoutes.js
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import * as buyerController from '../controllers/buyerController.js';

const router = express.Router();

router.get('/wallet', protect, buyerController.getBuyerWalletBalance);
router.get('/products', protect, buyerController.getAllProductsForPurchase);
router.post('/purchase/:id', protect, buyerController.purchaseProduct);
router.post('/refund/:id', protect, buyerController.refundProduct);
router.get('/purchases', protect, buyerController.getAllPurchases);

export default router;
