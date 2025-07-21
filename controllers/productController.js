import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

// Create a product
export async function createProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const product = new Product(req.body);

    try {
        const response = await product.save();
        res.json({
            message: "Product created successfully",
            product: response
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Failed to create product" });
    }
}

// Get all products (admin gets all, others only available ones)
export async function getProducts(req, res) {
    try {
        const products = isAdmin(req)
            ? await Product.find()
            : await Product.find({ isAvailable: true });

        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Failed to fetch products" });
    }
}

// Delete a product
export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    try {
        const productId = req.params.productId;
        const response = await Product.deleteOne({ productId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Failed to delete product" });
    }
}

// Update a product
export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const data = req.body;
    const productId = req.params.productId;

    // Prevent overwriting the productId
    data.productId = productId;

    try {
        await Product.updateOne({ productId }, data);
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Failed to update product" });
    }
}

// Get a specific product by ID
export async function getProductInfo(req, res) {
    try {
        const productId = req.params.productId;
        const result = await Product.findOne({ productId });

        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (isAdmin(req) || result.isAvailable) {
            return res.json(result);
        } else {
            return res.status(404).json({ message: "Product not available" });
        }
    } catch (error) {
        console.error("Error fetching product info:", error);
        return res.status(500).json({ message: "Failed to fetch product info" });
    }
}
