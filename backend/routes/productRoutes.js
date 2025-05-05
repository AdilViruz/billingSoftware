import express from 'express';
import accessTokenAutoRefresh from '../middlewares/accessTokenAutoRefresh.js';
import passport from 'passport';
import ProductController from '../controllers/productController.js';
import setAuthHeader from '../middlewares/setAuthHeader.js';
import verifyToken from '../middlewares/setAuthHeader.js';
const router = express.Router();

// Build products protected routes
router.post('/add-build-products',verifyToken,ProductController.addBuildProduct)
router.get('/build-products/:branch', verifyToken,ProductController.buildProducts)
router.get('/single-build-products/:branch/:id',verifyToken,ProductController.SinglebuildProducts)
router.put('/build-products/:id',verifyToken,ProductController.updateBuildProduct)
router.delete('/delete-build-products/:id',verifyToken,ProductController.DeleteBuildProduct)

// Sold products protected routes
router.post('/add-sold-products',verifyToken,ProductController.addSoldProduct)
router.get('/sold-products/:branch',verifyToken,ProductController.SoldProducts)
router.get('/single-sold-products/:branch/:id',verifyToken,ProductController.SingleSoldProducts)
router.put('/sold-products/:id',verifyToken,ProductController.updateSoldProduct)
router.delete('/delete-sold-products/:id',verifyToken,ProductController.DeleteSoldProduct)

// Raw Materials protected routes
router.post('/add-raw-materials',verifyToken,ProductController.addRawMaterials)
router.get('/raw-materials/:branch',verifyToken,ProductController.rawMaterials)
router.get('/single-raw-materials/:branch/:id',verifyToken,ProductController.singleRawMaterial)
router.put('/raw-materials/:id',verifyToken,ProductController.updateRawMaterial)
router.delete('/delete-raw-materials/:id',verifyToken,ProductController.DeleteRawMaterial)
router.get('/dashboard/:branch',verifyToken,ProductController.Dashboard)
export default router