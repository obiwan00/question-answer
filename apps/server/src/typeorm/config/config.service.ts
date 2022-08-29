import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';

dotenv.config();


type RemoveIndex<T> = {
  [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P]
};
// NodeJS.ProcessEnv without "[key: string]: string | undefined" and "[key: number]: string | undefined"
type ProcessEnv = RemoveIndex<NodeJS.ProcessEnv>;


class ConfigService {

  public constructor(private env: { [key in keyof ProcessEnv]: string | undefined }) { }

  public getValue(key: keyof ProcessEnv): string | undefined {
    return this.env[key];
  }

  public ensureValues(keys: Array<keyof ProcessEnv>): this {
    keys.map(key => ({ key, value: this.getValue(key) }))
      .filter(({ value }) => value === undefined)
      .forEach(({ key }) => { throw new Error(`Config error - missing env.${key}`) });

    return this;
  }

  public getPort(): number {
    const port = this.getValue('POSTGRES_PORT');
    if (port) {
      return parseInt(port);
    }

    return 3000;
  }

  public isProduction(): boolean {
    const mode = this.getValue('MODE');
    return mode === 'production';
  }

  public isDevelopment(): boolean {
    const mode = this.getValue('MODE');
    return mode === 'development';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: this.getPort(),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),

      synchronize: this.isDevelopment(),

      entities: [
        join(__dirname, '../entity/**/*.entity{.ts,.js}'),
        ...getMetadataArgsStorage().tables.map(tbl => tbl.target),
      ],
      migrationsTableName: 'migration',
      migrations: [join(__dirname, '../migration/*.ts')],
      cli: {
        migrationsDir: join(__dirname, '../migration'),
      },

      ssl: this.getValue('USE_SSL') === 'true',
    };
    console.log('mode:', this.getValue('MODE'));
    console.log('isProduction:', this.isProduction());
    console.log('isDevelopment:', this.isDevelopment());
    console.log('config', config);
    return config;
  }
}

const configService = new ConfigService(process.env);
configService.ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'RUN_MIGRATIONS',

  'GOOGLE_CLIENT_ID',
  'GOOGLE_SECRET',

  'HOST',
  'PORT',
  'MODE',
  'USE_SSL',
  'SESSION_SECRET',
]);

export { configService };
