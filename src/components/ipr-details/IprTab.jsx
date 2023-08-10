import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import IprDetails from './IprDetails';

const IprTab = () => {
  const [searchParams] = useSearchParams();
  const documentId = searchParams.get('documentId');
  const urlParams = new URLSearchParams(window.location.search);
  const objectValue = urlParams.get('FocusDoc');

  useEffect(() => {
    localStorage.setItem('FocusDoc', objectValue);
    urlParams.delete('FocusDoc');
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, document.title, newUrl);
  }, []);

  return (
    <IprDetails
      isIPRExpanded
      documentId={documentId}
      fromFocusArea={false}
      showActions={false}
    />
  );
};

export default IprTab;
