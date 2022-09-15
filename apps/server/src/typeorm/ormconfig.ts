import { ensureObjectValues } from '@qa/server/typeorm/config/ensure-values.util';
import { EnvFields } from '@qa/server/typeorm/config/env-fields.model';
import { getEnvFieldValue } from '@qa/server/typeorm/config/get-env-value.util';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { ConnectionOptions, getMetadataArgsStorage } from "typeorm";


dotenv.config();

ensureObjectValues(process.env, (Object).keys(EnvFields));
const isDevelopment = getEnvFieldValue(EnvFields.MODE) === 'development';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: getEnvFieldValue(EnvFields.POSTGRES_HOST),
  port: Number(getEnvFieldValue(EnvFields.POSTGRES_PORT)),
  username: getEnvFieldValue(EnvFields.POSTGRES_USER),
  password: getEnvFieldValue(EnvFields.POSTGRES_PASSWORD),
  database: getEnvFieldValue(EnvFields.POSTGRES_DATABASE),

  synchronize: isDevelopment,
  entities: [
    join(__dirname, '../**/*.entity{.ts, .js}'),
    ...getMetadataArgsStorage().tables.map(tbl => tbl.target),
  ],
  migrations: [join(__dirname, './migrations/**/*{.ts, .js}')],
  cli: {
    migrationsDir: join(__dirname, './migrations'),
  },
};

// if (isDevelopment) {
console.log('Mode:', getEnvFieldValue(EnvFields.MODE));
console.log('Config: ', ormconfig);
// }

export default ormconfig;
