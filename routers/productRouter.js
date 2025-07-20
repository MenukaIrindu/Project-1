import express from 'express';
import { createProduct , getProducts , getProductInfo , deleteProduct , updateProduct} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
product.get("/:productId", getProductInfo); // Assuming you want to fetch a specific product by ID
productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);


export default productRouter;

