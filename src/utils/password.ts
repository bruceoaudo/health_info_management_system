import argon2 from "argon2";
import crypto from "crypto";

const SALT_LENGTH = 16;

// Generate a secure random salt
const generateSalt = (): Buffer => {
  return crypto.randomBytes(SALT_LENGTH);
};

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = generateSalt();

  const hash = await argon2.hash(plainPassword, {
    type: argon2.argon2id, // Stronger against GPU attacks
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 5, // Number of iterations
    parallelism: 2, // Parallel threads
    salt,
  });

  return hash;
};

export const verifyPassword = async (
  hashedPassword: string,
  inputPassword: string
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, inputPassword);
};