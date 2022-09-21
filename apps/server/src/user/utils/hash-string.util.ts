import { environment } from "@qa/server/environments/environment";
import { pbkdf2Sync, randomBytes } from "crypto";

export function getHashedString(stringToHash: string, salt?: string): { hashedString: string, salt: string } {
  const { saltBaseLength, iterations, keyLenth, digestAlgorithm } = environment.passwordHashing;

  salt = salt || randomBytes(saltBaseLength).toString('hex');
  const hashedString = pbkdf2Sync(
    stringToHash,
    salt,
    iterations,
    keyLenth,
    digestAlgorithm,
  ).toString('hex');

  return { hashedString, salt };
}
