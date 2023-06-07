import { useTranslation } from 'react-i18next';
import React, {
  useState, useEffect,
  useContext,
} from 'react';
import getHistoryApi from 'apis/history/getHistoryApi';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSearchParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import i18n from 'i18n';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';
import Select from 'components/shared/form/select/Select';
import { tableNames } from 'dbConfig';
import EmptyState from 'components/shared/empty-state/EmptyState';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import { useAuth } from 'react-oidc-context';
import notAssigned from '../../assets/images/not-assigned.svg';
import SortHistory from './SortHistory';
import './viewHistory.scss';
import IndexedDbAppPagination from '../shared/app-pagination/IndexedDbAppPagination';
import SearchHistoryTables from './SearchHistoryTables';

function ViewHistory() {
  const { t } = useTranslation('history');
  const [pageReset, setPageReset] = useState(0);
  const { setWorkStreamId } = useContext(SelectedWorkStreamIdContext);
  const [sortByMostRecent, setSortByMostRecent] = useState('desc');
  const { cachedRequests } = useContext(CacheContext);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });
  const currentLang = i18n.language;
  const [selectedWorkStream, setSelectedWorkStream] = useState(1);
  const auth = useAuth();
  const { workStreamId } = useContext(SelectedWorkStreamIdContext);
  const [searchParams] = useSearchParams();

  const resetPageNumber = () => {
    setPageReset((prev) => prev + 1);
  };

  const changeSortBy = () => {
    setSortByMostRecent(sortByMostRecent === 'asec' ? 'desc' : 'asec');
  };
  function workstreamName(workstream) {
    return currentLang === 'ar' ? workstream.workstreamNameAr : workstream.workstreamName;
  }

  const WorkStreamsOptions = workstreams?.data?.map((workstream) => ({
    label: workstreamName(workstream),
    value: workstream.id,
  }));

  const onChangeWorkStream = (i) => {
    setWorkStreamId(WorkStreamsOptions?.find(
      (element) => element.value === i.value,
    ));
    resetPageNumber();
    setWorkStreamId(i.value);
    setSelectedWorkStream(i);
  };

  const axiosConfig = getHistoryApi(
    {
      workstreamId: workStreamId,
      type: 'search',
    },
    { manual: true },
  );
  useEffect(() => {
    if (WorkStreamsOptions?.length) {
      setWorkStreamId(WorkStreamsOptions[0].value);
      setSelectedWorkStream(WorkStreamsOptions[0]);
    }
  }, [workstreams, currentLang]);

  const isAuth = auth && auth.user;

  const searchHistoryTables = (
    SearchHistoryTables
  );
  return (
    <Container fluid>
      <Row>
        <Col md={12} className="px-md-19 view-history">
          <div className="d-lg-flex justify-content-between my-8 p-8 app-bg-primary-01 rounded">
            <div className="d-md-flex mb-lg-0 mb-8">
              <h5 className="mb-0 mt-4">
                {t('mySearchHistory')}
              </h5>
              <Select
                options={WorkStreamsOptions}
                moduleClassName="menu"
                selectedOption={selectedWorkStream}
                setSelectedOption={onChangeWorkStream}
                className="workStreams ms-md-3 mt-1 customSelect"
              />
            </div>
            <SortHistory changeSortBy={changeSortBy} />
          </div>
          {isAuth ? (
            <AppPagination
              PaginationWrapper="justify-content-center d-flex"
              axiosConfig={axiosConfig}
              defaultPage={Number(searchParams.get('page') || '1')}
              RenderedComponent={searchHistoryTables}
              sort={sortByMostRecent === 'desc' ? 'mostRecent' : 'leastRecent'}
              emptyState={<EmptyState
                title={t('noHistory')}
                msg={t('emptyStateMsg')}
                img={notAssigned}
                className="no-history"
              />}
              resetPage={pageReset}
              renderedProps={{
                selectedWorkStream: workStreamId,
              }}
              updateDependencies={[...Object.values({ workStreamId, sortByMostRecent })]}
            />
          ) : (
            <IndexedDbAppPagination
              paginationWrapper="justify-content-center d-flex"
              RenderedComponent={searchHistoryTables}
              tableName={tableNames.saveHistory}
              emptyState={<EmptyState
                title={t('noHistory')}
                msg={t('emptyStateMsg')}
                img={notAssigned}
                className="no-history"
              />}
              indexMethod="indexByIndexName"
              resetPage={pageReset}
              indexMethodProps={{
                sorted: sortByMostRecent,
                sortedIndexName: 'updatedAt',
                indexName: 'workstreamId',
                indexValue: workStreamId,
              }}
              renderedProps={{
                selectedWorkStream: workStreamId,
              }}
              updateDependencies={[...Object.values({ workStreamId, sortByMostRecent })]}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ViewHistory;
