import { useSearchParams } from 'react-router-dom';
import IprDetails from './IprDetails';

const IprTab = () => {
  const [searchParams] = useSearchParams();
  const documentId = searchParams.get('documentId');

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
