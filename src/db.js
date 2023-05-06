import Dexie from 'dexie';
import { tableNames } from 'dbConfig';

const timestamp = ['createdAt', 'updatedAt'];

const db = new Dexie('SAIPDB');

db.version(0.1).stores({
  [tableNames.savedQuery]: ['++id', 'queryString', 'resultCount', 'synonymous', 'workstreamId', ...timestamp].join(', '),
});

export default db;
