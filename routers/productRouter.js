import express from "express";
import {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProductInfo
} from "../controllers/productController.js"; // adjust path if needed

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:productId", getProductInfo);
router.delete("/:productId", deleteProduct);
router.put("/:productId", updateProduct);

export default router;
