import { EnvFields } from "@qa/server/typeorm/config/env-fields.model";

export function getEnvFieldValue(key: EnvFields): string | never {
  const envValueByFiled = process.env[key];

  if (envValueByFiled === undefined) {
    throw new Error(`Config error - missing process.env.${key}`);
  }

  return envValueByFiled;
}
