const express = require("express");
const { register, login, checkAuth } = require("../controllers/auth");
const { getOrders, addOrder, getOrderByUser } = require("../controllers/order");
const {
  getProducts,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");
const {
  getProfiles,
  updateProfile,
  getProfile,
} = require("../controllers/profile");
const {
  getTopings,
  getToping,
  addToping,
  deleteToping,
  updateToping,
} = require("../controllers/toping");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getUserTransaction,
} = require("../controllers/transaction");
const {
  getUsers,
  addUser,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const router = express.Router();

//Route User
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/user", addUser);
router.delete("/user/:id", deleteUser);
router.patch("/user/:id", auth, uploadFile("image"), updateUser);

//Route Product
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", auth, uploadFile("image"), addProduct);
router.delete("/product/:id", deleteProduct);
router.patch("/product/:id", auth, uploadFile("image"), updateProduct);

//Route Topings
router.get("/topings", getTopings);
router.get("/toping/:id", getToping);
router.post("/toping", auth, uploadFile("image"), addToping);
router.delete("/toping/:id", deleteToping);
router.patch("/toping/:id", auth, uploadFile("image"), updateToping);

//Route Auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

//Route Profile
router.get("/profiles", auth, getProfiles);
router.get("/profile/:id", getProfile);
router.patch("/profile/:id", auth, uploadFile("image"), updateProfile);

//Route Order
// router.get("/orders", getOrders);
// router.post("/order", auth, addOrder);
// router.get("/orderuser/:id", auth, getOrderByUser);

router.post("/transaction", auth, uploadFile("imgpay"), addTransaction);
router.get("/transactions", getTransactions);
router.get("/cart/", auth, getUserTransaction);
router.patch("/transaction/:id", auth, updateTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);
module.exports = router;
