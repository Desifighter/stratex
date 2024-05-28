import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/User.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
  
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
   
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role:(role&&role==2)?2:1,
    });
    console.log(newUser);
    res.status(201).send({
        success: true,
        message: "User Registered Successfully",
        newUser,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error: error.parent.sqlMessage,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(201).send({
        success: false,
        message: "Invalid credential",
      });
    }

    const details = await User.findOne({ where: { email } });
    // validation
    console.log(details);
    if (!details) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await comparePassword(password, details.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Wrong Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: details.id, }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      User: {
        id: details.id,
        name: details.name,
        email: details.email,
        role: details.role
      },
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// const user_seller = async (model, role, email, password,res) => {
//   const details = await model.findOne({ where: { email } });
//   // validation
//   console.log(details);
//   if (!details) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const match = await comparePassword(password, details.password);

//   if (!match) {
//     return res.status(200).send({
//       success: false,
//       message: "Wrong Password",
//     });
//   }
//   //token
//   const token = await JWT.sign({ _id: details._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   res.status(200).send({
//     success: true,
//     message: "Login successfully",
//     User: {
//       _id: details._id,
//       name: details.name,
//       email: details.email,
//       role: role ? role : 0,
//     },
//     token,
//   });
// };

// let seller = false;
// if (!role && role == 1) {
//   seller = true;
// }

// if (seller) {
//   const sellerDetail = await Seller.findOne({ where: { email } });
//   // validation
//   console.log(sellerDetail);
//   if (!sellerDetail) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const match = await comparePassword(password, sellerDetail.password);

//   if (!match) {
//     return res.status(200).send({
//       success: false,
//       message: "Wrong Password",
//     });
//   }
//   //token
//   const token = await JWT.sign(
//     { _id: sellerDetail._id },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "7d",
//     }
//   );
//   res.status(200).send({
//     success: true,
//     message: "Login successfully",
//     sellerDetail: {
//       _id: sellerDetail._id,
//       name: sellerDetail.name,
//       email: sellerDetail.email,
//     },
//     token,
//   });
//   return;
// }
// // validation
// const user = await User.findOne({ where: { email } });
// console.log(user);
// if (!user) {
//   return res.status(401).json({ message: 'Invalid email or password' });
// }

// const match = await comparePassword(password, user.password);

// if (!match) {
//   return res.status(200).send({
//     success: false,
//     message: "Wrong Password",
//   });
// }

// //token
// const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//   expiresIn: "7d",
// });

// res.status(200).send({
//   success: true,
//   message: "Login successfully",
//   user: {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//   },
//   token,
// });
