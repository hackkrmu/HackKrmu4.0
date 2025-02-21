import jwt from "jsonwebtoken";
import prisma from "../../helpers/prisma.js";

export const isMummy = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! No user found." });
    }
  
    if (req.user.role !== "MUMMY") {
      return res.status(403).json({ message: "Access denied! Only MUMMIES can access this page." });
    }
  
    next();
  };
  
  
  export const verifyToken = async (req, res, next) => {
    try {
      const token = req.cookies.token; 
  
      if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
      }
  
      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
  
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      req.user = user; 
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid token!" });
    }
  };
  