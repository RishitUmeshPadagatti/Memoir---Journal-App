import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const signup =async(req,res,next)=>{
    try {
        const { name, email, password } = req.body;
        
        // Check if the user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create the user
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
    
        // Generate a JWT token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
    
        res.status(201).json({ 
          message: "User created successfully", 
          token 
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const login = async (req, res, next) => {
        try {
          const { email, password } = req.body;
      
          // Check if the user exists
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
          }
      
          // Compare passwords
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
          }
      
          // Generate a JWT token
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, );
      
          res.status(200).json({ 
            message: "Login successful", 
            token 
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
};
      
export const logout = async (req, res, next) => {
        try {
          // Logout logic for JWT is usually handled on the client-side by destroying the token.
          // Here, we can invalidate the token in a blacklist or inform the client to delete it.
          res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
};

