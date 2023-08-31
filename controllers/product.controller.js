const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productSchema");

const productCtrl = {
  createProduct: async (req, res) => {
    try {
      const data = req.body.data;
      const finalData = JSON.parse(data);
      const { title, description, totalColors, palletes } = finalData;
      if (!title || !description || !totalColors || palletes.length === 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please fill missing data" });
      } else {
        const newProduct = new Product({
          title,
          description,
          totalColors,
          palletes,
        });
        await newProduct.save();
        return res.status(StatusCodes.CREATED).json({ msg: "Product Created" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getProducts: async (req, res) => {
    try {
      const findProducts = await Product.find();
      if (findProducts.length > 0) {
        return res.status(StatusCodes.OK).json(findProducts);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "Products not found!" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      const findProduct = await Product.findById(id);
      if (findProduct) {
        return res.status(StatusCodes.OK).json(findProduct);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No product available" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body.data;
      const finalData = JSON.parse(data);
      const { title, description, totalColors, palletes } = finalData;
      if (!title || !description || !totalColors || palletes.length === 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Please fill missing data" });
      } else {
        await Product.findByIdAndDelete(id);
        const newProduct = new Product({
          title,
          description,
          totalColors,
          palletes,
        });
        await newProduct.save();
        return res.status(StatusCodes.OK).json({ msg: "Product Updated" });
      }
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      await Product.findByIdAndDelete(id);
      return res.status(StatusCodes.OK).json({ msg: "Product deleted" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
