import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import type { Request, Response, NextFunction } from "express";
import mkCustomError from "../errors/CustomError.ts";

const authUser = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  //this if sign is set to true in server response in auth
  //otherwise just req.cookies.authorization would do
  const authCookie = req.signedCookies.authorization;

  //console.log("Cookies:", req.cookies);

  let token: string | undefined;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (authCookie) {
    //req.signedCookies.authorization
    //    return res.status(401).json({ error: "Unauthorized" });
    token = authCookie;
  }

  if (!token) {
    throw mkCustomError("Authentication Invalid: No Token Provided.", 401);
  }

  //console.log({ token });
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    console.log({ decoded });
    req.user = decoded;

    next();
  } catch (error) {
    throw mkCustomError("Invalid or expired token.", 401);
  }
};

export default authUser;
