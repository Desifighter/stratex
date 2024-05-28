import JWT from "jsonwebtoken";
import User from "../models/User";

// protected routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    console.log(decode);
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Token Problem",
      ok:false
    });
    console.log(error);
  }
};

// Seller access
export const isSeller = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id:req.user.id } });
    console.log(user);
    if (user.role !== "seller") {
      res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middle ware",
    });
  }
};

