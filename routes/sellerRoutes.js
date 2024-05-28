import express from "express";
import upload from "../middlewares/upload.js";
import { requireSignIn, isSeller } from "../middlewares/authMiddleware.js";
import {
  addBooksFromCSV,
  allSellerBooks,
  updateBookById,
  deleteBookById,
} from "../controllers/sellerController.js";

const router = express.Router();

router.post("/upload-csv",requireSignIn,isSeller, upload, addBooksFromCSV);
router.get("/allbooks",requireSignIn,isSeller, allSellerBooks);
router.put("/updatebook/:bookid",requireSignIn,isSeller, updateBookById);
router.delete("/deletebook/:bookid", requireSignIn, isSeller, deleteBookById);

export default router;
