import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getBooks, getDetails } from "../controllers/userController.js";

const router = express.Router();
router.get("/allbooks",requireSignIn,getBooks);
router.get("/book/:id",requireSignIn,getDetails);
export default router;