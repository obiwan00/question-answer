import { User } from './../entity/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';
dotenv.config();


class ConfigService {

  public constructor(private env: { [key: string]: string | undefined }) { }


  public ensureValues(keys: string[]): this {
    keys.forEach(key => this.getValue(key, true));
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
        join(__dirname, './**/*.entity{.ts,.js}'),
        ...getMetadataArgsStorage().tables.map(tbl => tbl.target)
      ],
      migrationsTableName: 'migration',
      migrations: [join(__dirname, '../migration/*.ts')],
      cli: {
        migrationsDir: join(__dirname, '../migration'),
      },

      ssl: this.isProduction(),
    };
    console.log('mode:', this.getValue('MODE'));
    console.log('isProduction:', this.isProduction());
    console.log('isDevelopment:', this.isDevelopment());
    console.log('config', config);
    return config;
  }

  private getValue(key: string, throwErrorOnMissing = true): string | undefined {
    const value = this.env[key];
    if (!value && throwErrorOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
}

const configService = new ConfigService(process.env);
configService.ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE'
]);

export { configService };
