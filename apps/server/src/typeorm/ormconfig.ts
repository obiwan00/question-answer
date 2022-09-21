import { TagEntity } from '@qa/server/tag/tag.entity';
import { ensureObjectValues } from '@qa/server/typeorm/config/ensure-values.util';
import { EnvFields } from '@qa/server/typeorm/config/env-fields.model';
import { getEnvFieldValue } from '@qa/server/typeorm/config/get-env-value.util';
import { UserEntity } from '@qa/server/user/user.entity';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from "typeorm";


dotenv.config();

ensureObjectValues(process.env, [
  EnvFields.POSTGRES_HOST,
  EnvFields.POSTGRES_PORT,
  EnvFields.POSTGRES_USER,
  EnvFields.POSTGRES_PASSWORD,
  EnvFields.POSTGRES_DATABASE,
  EnvFields.RUN_MIGRATIONS,
  EnvFields.HOST,
  EnvFields.PORT,
  EnvFields.NODE_ENV,
  EnvFields.SECRET_KEY,
]);
const isDevelopment = getEnvFieldValue(EnvFields.NODE_ENV) === 'development';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: getEnvFieldValue(EnvFields.POSTGRES_HOST),
  port: Number(getEnvFieldValue(EnvFields.POSTGRES_PORT)),
  username: getEnvFieldValue(EnvFields.POSTGRES_USER),
  password: getEnvFieldValue(EnvFields.POSTGRES_PASSWORD),
  database: getEnvFieldValue(EnvFields.POSTGRES_DATABASE),

  synchronize: isDevelopment,
  entities: [
    TagEntity,
    UserEntity,
  ],
  migrations: [join(__dirname, './migrations/**/*{.ts, .js}')],
  cli: {
    migrationsDir: join(__dirname, './migrations'),
  },
};

// if (isDevelopment) {
console.log('Mode:', getEnvFieldValue(EnvFields.NODE_ENV));
console.log('Config: ', ormconfig);
// }

export default ormconfig;
