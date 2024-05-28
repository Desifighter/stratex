import express from "express";
import upload from "../middlewares/upload.js";
import { requireSignIn, isSeller } from "../middlewares/authMiddleware.js";
import {
  addBooksFromCSV,
} from "../controllers/sellerController.js";

const router = express.Router();

router.post("/upload-csv",requireSignIn,isSeller, upload, addBooksFromCSV);

export default router;
