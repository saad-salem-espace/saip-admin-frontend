import { useIndexedDB } from 'react-indexed-db';
import db from 'db';

/**
 * A Wrapper for IndexedDB
 *
 * @param tableName {string}
 */
const useIndexedDbWrapper = (tableName) => {
  const { add, getByIndex } = useIndexedDB(tableName);

  const orderedBy = (instance, indexName, orderType) => {
    if (!instance || !indexName) return instance;
    switch (orderType.toLowerCase()) {
      case 'asc':
        return instance.orderBy(indexName);
      case 'desc':
        return instance.orderBy(indexName).reverse();
      default:
        return instance;
    }
  };

  const deleteInstance = ({
    indexValue, onSuccess,
  }) => {
    db[tableName].delete(indexValue).then(
      onSuccess,
    );
  };

  const countAllByIndexName = ({ indexName, indexValue }) => (
    db[tableName].where(indexName).equals(indexValue.toString()).count()
  );

  const getTimeStamp = () => {
    const currentDatetimeUTC = new Date().toISOString();
    return { createdAt: currentDatetimeUTC, updatedAt: currentDatetimeUTC };
  };

  /**
   * Saving data to indexedDB
   *
   * @param instance {{
   *   data: object,
   *   onSuccess: function,
   *   onError: function,
   *   setTimeStamp: true=,
   *   key: any=
   * }}
   * @return {boolean}
   */
  const addInstanceToDb = (instance) => {
    const data = { ...instance.data };
    if (Object.keys(data).length > 0) {
      if (instance.setTimeStamp ?? true) {
        Object.assign(data, getTimeStamp());
      }
      add(data, instance.key).then(instance.onSuccess).catch(instance.onError);
      return true;
    }
    return false;
  };

  /**
   * Get instance by index
   *
   * @param instance {{
   *   indexName: String,
   *   indexValue: any,
   *   onSuccess: function,
   *   onError: function,
   * }}
   */
  const getInstanceByIndex = (instance) => {
    getByIndex(instance.indexName, instance.indexValue)
      .then(instance.onSuccess).catch(instance.onError);
  };

  const indexByIndexName = ({
    onSuccess, onError, sorted = 'NONE', sortedIndexName, indexName, indexValue, limit = 10, page = 1,
  }) => {
    const offset = (page - 1) * limit;
    const stringIndex = indexValue.toString();
    const pTotal = countAllByIndexName({ indexName, indexValue });
    const pData = orderedBy(db[tableName], sortedIndexName, sorted)
      .filter((data) => data[indexName] === stringIndex)
      .offset(offset)
      .limit(limit)
      .toArray();

    Promise.all([pData, pTotal])
      .then(([data, total]) => {
        onSuccess({ data, pagination: { per_page: limit, total } });
      })
      .catch((errors) => { onError(errors); });
  };
  return {
    addInstanceToDb, getInstanceByIndex, indexByIndexName, countAllByIndexName, deleteInstance,
  };
};

export default useIndexedDbWrapper;
