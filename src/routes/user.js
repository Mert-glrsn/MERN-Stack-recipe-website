import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.js";

const router = express.Router();
router.post("/register" , async (req, res)=>{
      const {username , password} = req.body;
      const user = await UserModel.findOne({username});
      if(user){
            return res.json({message:"user already exist"});
      }
      const hashedPassword = await bcrypt.hash(password , 10)
      const newUser = new UserModel({username , password:hashedPassword });
      await newUser.save();
      res.json({message:"user registered"});
} );
router.post("/login" , async (req,res)=>{
      const {username , password} = req.body;
      const user = await UserModel.findOne({username});
      if(!user){
            return res.json({message:"user doeans't exist"});
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword){
            return res.json({message:"Invalid register"});
      }
      const token = jwt.sign({id:user._id},"secret");
      res.json({token , userID:user._id});
} );

router.get("/users/:userId", async (req, res) => {
      try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User does not exist." });
        }
        const isAdminUser = user.username === "admin";
        res.json({ isAdmin: isAdminUser });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
      }
     });
export {router as userRouter}; 