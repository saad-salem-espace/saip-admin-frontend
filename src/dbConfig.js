const tableNames = {
  savedQuery: 'savedQuery',
  bookmarks: 'bookmarks',
};

export { tableNames };

const timeStamp = [
  { name: 'updatedAt', keypath: 'updatedAt', options: { unique: false } },
  { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
];

const dbConfig = {
  name: 'SAIPDB',
  version: 1,
  objectStoresMeta: [
    {
      store: tableNames.savedQuery,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'queryString', keypath: 'queryString', options: { unique: false } },
        { name: 'resultCount', keypath: 'resultCount', options: { unique: false } },
        { name: 'synonymous', keypath: 'synonymous', options: { unique: false } },
        { name: 'workstreamId', keypath: 'workstreamId', options: { unique: false } },
        ...timeStamp,
      ],
    },
    {
      store: tableNames.bookmarks,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'filingNumber', keypath: 'filingNumber', options: { unique: false } },
        { name: 'workstreamId', keypath: 'workstreamId', options: { unique: false } },
        ...timeStamp,
      ],
    },
  ],
};

export default dbConfig;
