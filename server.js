import express from "express";
import "dotenv/config";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

// connect database

connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/seller", sellerRoutes);
app.use("/api/v1/user", userRoutes);

app.get("", (req, res) => {
  res.send("Everything Is Working fine");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
