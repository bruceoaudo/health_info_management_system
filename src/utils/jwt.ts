import jwt, { SignOptions } from "jsonwebtoken";

export interface TokenPayload {
  id: string;
}

export const createToken = (user: TokenPayload): string => {
  const { secret, expiresIn, algorithm } = getJwtConfig();

  const payload: TokenPayload = {
    id: user.id,
  };

  const options: SignOptions = {
    expiresIn,
    algorithm,
  };

  return jwt.sign(payload, secret, options);
};


export const getJwtConfig = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long");
  }

  const expiresIn = 3600 * 24; // 24 hours ( 3600 secs per hour * 24 hours)

  return {
    secret,
    expiresIn,
    algorithm: "HS256" as const,
  };
};
