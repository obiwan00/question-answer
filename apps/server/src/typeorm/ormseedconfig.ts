import ormconfig from "@qa/server/typeorm/ormconfig";
import { join } from "path";
import { ConnectionOptions } from "typeorm";

const ormseedconfig: ConnectionOptions = {
  ...ormconfig,
  migrations: [join(__dirname, './seeds/*.ts')],
};

export default ormseedconfig;
