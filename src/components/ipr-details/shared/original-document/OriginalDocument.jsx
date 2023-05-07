import attachmentApi from 'apis/common/attachmentApi';
import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';
import PropTypes from 'prop-types';
import MyDocument from './MyDocument';

const SLICE_SIZE = 3;
const ACTIVE_INDEX = 1;
function OriginalDocument({ originalDocuments, documentId, workstreamId }) {
  const originalDocs = originalDocuments.map((doc) => doc.FileName);
  const [documents, setDocuments] = useState(Array(SLICE_SIZE).fill(null));
  const [currentOriginalDocIndex, setCurrentOriginalDocIndex] = useState(0);
  const config = {
    workstreamId,
    fileType: 'pdf',
    id: documentId,
    fileName: null,
    responseType: 'arraybuffer',
  };
  const [, execute] = useAxios(attachmentApi(config));

  const fetchByArrayIndex = (index) => (
    execute(attachmentApi({ ...config, fileName: originalDocs[index] }))
  );
  const hasNext = !!originalDocs?.[currentOriginalDocIndex + 1];
  const hasPrevious = !!originalDocs?.[currentOriginalDocIndex - 1];

  useEffect(() => {
    const startFrom = ACTIVE_INDEX;
    const endAt = SLICE_SIZE;
    let docsIndex = 0;
    const totalDocsLength = originalDocs.length;
    let fetchedData;
    const documentsClone = [...documents];
    const fetchAndSetData = async () => {
      for (let i = startFrom; i < endAt && docsIndex < totalDocsLength; i += 1) {
      // Disabled to keep focus on downloading the main document first
      // eslint-disable-next-line no-await-in-loop
        fetchedData = await fetchByArrayIndex(docsIndex);
        documentsClone[i] = fetchedData.data;
        setDocuments(documentsClone);
        docsIndex += 1;
      }
    };
    fetchAndSetData();
  }, []);

  const nextDocument = async () => {
    const prevDocs = [...documents];
    const nextToFetch = SLICE_SIZE + currentOriginalDocIndex - ACTIVE_INDEX;
    const savedCurrDocIndex = currentOriginalDocIndex;
    if (hasNext) {
      prevDocs.shift();
      prevDocs.push(null);
      setDocuments(prevDocs);
      setCurrentOriginalDocIndex((docIdx) => docIdx + 1);
    }
    if (nextToFetch === savedCurrDocIndex || !originalDocs?.[nextToFetch]) return;
    const fetchedData = await fetchByArrayIndex(nextToFetch);
    if (fetchedData.data) {
      prevDocs[SLICE_SIZE - 1] = fetchedData.data;
      setDocuments(prevDocs);
    }
  };

  const previousDocument = async () => {
    const prevDocs = [...documents];
    const prevToFetch = currentOriginalDocIndex - ACTIVE_INDEX - 1;
    const savedCurrDocIndex = currentOriginalDocIndex;
    if (hasPrevious) {
      prevDocs.pop();
      prevDocs.unshift(null);
      setDocuments(prevDocs);
      setCurrentOriginalDocIndex((docIdx) => docIdx - 1);
    }
    if (prevToFetch === savedCurrDocIndex || prevToFetch < 0) return;
    const fetchedData = await fetchByArrayIndex(prevToFetch);
    if (fetchedData.data) {
      prevDocs[0] = fetchedData.data;
      setDocuments(prevDocs);
    }
  };

  return (
    documents?.[ACTIVE_INDEX] && <MyDocument
      documents={documents}
      hasNext={hasNext}
      hasPrevious={hasPrevious}
      nextDocument={nextDocument}
      previousDocument={previousDocument}
      activeIndex={ACTIVE_INDEX}
    />
  );
}

OriginalDocument.propTypes = {
  originalDocuments: PropTypes.arrayOf(PropTypes.shape({
    FileName: PropTypes.string.isRequired,
    DocumentFormat: PropTypes.string.isRequired,
  })).isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  workstreamId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default OriginalDocument;
