import { useTranslation } from 'react-i18next';
import getSavedQueryApi from 'apis/save-query/getSavedQueryApi';
import Select from 'components/shared/form/select/Select';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import i18n from 'i18n';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import NoData from 'components/shared/empty-states/NoData';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { tableNames } from 'dbConfig';
import CacheContext from 'contexts/CacheContext';
import useCacheRequest from 'hooks/useCacheRequest';
import { pascalCase } from 'change-case';
import Spinner from 'components/shared/spinner/Spinner';
import SavedQueriesTable from './SavedQueriesTable';
import IndexedDbAppPagination from '../shared/app-pagination/IndexedDbAppPagination';

const SavedQueries = () => {
  const { t } = useTranslation('queries');
  const [selectedWorkStream, setSelectedWorkStream] = useState(null);
  const [searchParams] = useSearchParams();
  const auth = useAuth();
  const { cachedRequests } = useContext(CacheContext);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });
  const [pageReset, setPageReset] = useState(0);
  const isMounted = useRef(false);
  const currentLang = i18n.language;

  function workstreamName(workstream) {
    return currentLang === 'ar' ? workstream.workstreamNameAr : pascalCase(workstream.workstreamName);
  }

  const WorkStreamsOptions = workstreams?.data?.map((workstream) => ({
    label: workstreamName(workstream),
    value: workstream.id,
  }));

  useEffect(() => {
    if (WorkStreamsOptions?.length) {
      setSelectedWorkStream(WorkStreamsOptions[0]);
      isMounted.current = true;
    }
  }, [workstreams, currentLang]);

  if (!isMounted.current) return <Spinner />;

  const resetPageNumber = () => {
    setPageReset((prev) => prev + 1);
  };

  const onChangeWorkStream = (i) => {
    console.log(i);
    setSelectedWorkStream(WorkStreamsOptions?.find(
      (element) => element.value === i.value,
    ));
    resetPageNumber();
  };

  const axiosConfig = getSavedQueryApi(selectedWorkStream.value, Number(searchParams.get('page') || '1'), true);

  const isAuth = auth && auth.user;

  const savedQueries = (
    SavedQueriesTable
  );
  return (
    <Container fluid>
      <Row>
        <Col md={12} className="px-md-19">
          <div className="d-flex my-8 p-8 bg-primary-01 rounded">
            <h5 className="mb-0 mt-4">{t('myQueries')}</h5>
            <Select
              options={WorkStreamsOptions}
              moduleClassName="menu"
              selectedOption={selectedWorkStream}
              setSelectedOption={onChangeWorkStream}
              className="workStreams ms-3 mt-1 customSelect"
            />
          </div>
          {isAuth ? (
            <AppPagination
              className="mt-8"
              axiosConfig={axiosConfig}
              defaultPage={Number(searchParams.get('page') || '1')}
              RenderedComponent={savedQueries}
              emptyState={<NoData />}
              resetPage={pageReset}
            />
          ) : (
            <IndexedDbAppPagination
              className="mt-8"
              RenderedComponent={savedQueries}
              tableName={tableNames.savedQuery}
              emptyState={<NoData />}
              indexMethod="indexByIndexName"
              resetPage={pageReset}
              indexMethodProps={{
                sorted: 'desc',
                sortedIndexName: 'updatedAt',
                indexName: 'workstreamId',
                indexValue: selectedWorkStream.value,
              }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SavedQueries;
