import { configService } from '@qa/server/typeorm';
import { writeFileSync } from 'fs';

writeFileSync('ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
