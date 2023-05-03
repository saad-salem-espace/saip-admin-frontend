import { useIndexedDB } from 'react-indexed-db';
import { useCallback } from 'react';

/**
 * A Wrapper for IndexedDB
 *
 * @param tableName {string}
 */
const useIndexedDbWrapper = (tableName) => {
  const { add, getByIndex } = useIndexedDB(tableName);

  const getTimeStamp = useCallback(() => {
    const currentDatetimeUTC = new Date().toISOString();
    return { createdAt: currentDatetimeUTC, updatedAt: currentDatetimeUTC };
  }, []);

  // eslint-disable-next-line function-paren-newline
  const addInstanceToDb = useCallback(
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
    (instance) => {
      const data = { ...instance.data };
      if (Object.keys(data).length > 0) {
        if (instance.setTimeStamp ?? true) {
          Object.assign(data, getTimeStamp());
        }
        add(data, instance.key).then(instance.onSuccess).catch(instance.onError);
        return true;
      }
      return false;
    }, []);

  // eslint-disable-next-line function-paren-newline
  const getInstanceByIndex = useCallback(
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
    (instance) => {
      getByIndex(instance.indexName, instance.indexValue)
        .then(instance.onSuccess).catch(instance.onError);
    }, []);

  return { addInstanceToDb, getInstanceByIndex };
};

export default useIndexedDbWrapper;
