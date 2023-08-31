const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const imageUpload = require("../middlewares/image.middleware");

const router = require("express").Router();

router.post("/", imageUpload.array("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", imageUpload.array("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
