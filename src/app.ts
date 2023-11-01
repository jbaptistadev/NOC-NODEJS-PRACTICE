import { Server } from './presentacion/server';
import { MongoDB } from './config/data/mongo';
import { envs } from './config/plugins/envs.plugin';

(() => main())();

async function main() {
  await MongoDB.connent({
    url: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  Server.start();
}
