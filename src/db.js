import Dexie from 'dexie';
import { tableNames } from 'dbConfig';

const timestamp = ['createdAt', 'updatedAt'];

const db = new Dexie('SAIPDB');

db.version(0.3).stores({
  [tableNames.savedQuery]: ['++id', 'queryString', 'resultCount', 'synonymous', 'workstreamId', ...timestamp].join(', '),
  [tableNames.bookmarks]: ['++id', 'filingNumber', 'workstreamId', ...timestamp].join(', '),
  [tableNames.saveHistory]: ['++id', 'queryString', 'workstreamId', 'synonymous', ...timestamp].join(', '),
});

export default db;
