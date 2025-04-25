import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getJwtConfig, TokenPayload } from "../utils/jwt";

declare module "express" {
  interface Request {
    id?: string;
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Login again to proceed" });
    return;
  }

  try {

    const { secret, algorithm } = getJwtConfig();
    const decoded = jwt.verify(token, secret, {
      algorithms: [algorithm],
      clockTolerance: 30, // 30s leeway
    }) as TokenPayload;

    req.id = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};