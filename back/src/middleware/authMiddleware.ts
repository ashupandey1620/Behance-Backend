import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.sendStatus(401).json({
      message: "Token Required",
    });
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err)
      return res.status(403).json({
        message: "Invalid Token",
      });
    console.log("Verified User: ", user);

    next();
  });
};
