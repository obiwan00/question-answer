import { configService } from '../config/config.service';
import { writeFileSync } from 'fs';

writeFileSync('ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2)
);
