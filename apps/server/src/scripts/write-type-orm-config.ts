import { configService } from '@qa/server/config';
import { writeFileSync } from 'fs';

writeFileSync('ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
