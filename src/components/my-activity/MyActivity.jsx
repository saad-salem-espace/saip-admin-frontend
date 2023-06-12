import { useTranslation, Trans } from 'react-i18next';
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
import EmptyState from 'components/shared/empty-state/EmptyState';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import notActivities from '../../assets/images/no-activities.svg';
import SortOrder from '../shared/sort-order/SortOrder';
import MyActivityList from './MyActivityList';

function MyActivity() {
  const { t } = useTranslation('activity');
  const [pageReset, setPageReset] = useState(0);
  const { setWorkStreamId } = useContext(SelectedWorkStreamIdContext);
  const [sortByMostRecent, setSortByMostRecent] = useState('desc');
  const { cachedRequests } = useContext(CacheContext);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });
  const currentLang = i18n.language;
  const [selectedWorkStream, setSelectedWorkStream] = useState(1);
  const { workStreamId } = useContext(SelectedWorkStreamIdContext);
  const [searchParams] = useSearchParams();
  const [hasData, setHasData] = useState(false);

  const checkHasData = (i) => {
    setHasData(i);
  };

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
      type: 'all',
    },
    { manual: true },
  );
  useEffect(() => {
    if (WorkStreamsOptions?.length) {
      setWorkStreamId(WorkStreamsOptions[0].value);
      setSelectedWorkStream(WorkStreamsOptions[0]);
    }
  }, [workstreams, currentLang]);

  const myActivityList = (
    MyActivityList
  );

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="px-md-19 view-history">
          <div className="d-lg-flex justify-content-between mb-10 py-4 border-bottom">
            <div className="d-md-flex mb-lg-0 mb-8">
              <h5 className="mb-0 mt-4 app-text-primary">
                <Trans
                  i18nKey="myActivities"
                  ns="activity"
                >
                  <span className="font-regular" />
                </Trans>
              </h5>
              <Select
                options={WorkStreamsOptions}
                moduleClassName="menu"
                selectedOption={selectedWorkStream}
                setSelectedOption={onChangeWorkStream}
                className="workStreams ms-md-3 mt-1 customSelect"
              />
            </div>
            {
              hasData !== 0 && (
                <SortOrder changeSortBy={changeSortBy} />
              )
            }
          </div>
          <AppPagination
            PaginationWrapper="justify-content-center d-flex"
            axiosConfig={axiosConfig}
            defaultPage={Number(searchParams.get('page') || '1')}
            RenderedComponent={myActivityList}
            sort={sortByMostRecent === 'desc' ? 'mostRecent' : 'leastRecent'}
            emptyState={<EmptyState
              title={t('emptyStateTitle')}
              msg={t('emptyStateMsg')}
              img={notActivities}
              className="no-history"
            />}
            resetPage={pageReset}
            renderedProps={{
              selectedWorkStream: workStreamId,
            }}
            updateDependencies={[...Object.values({ workStreamId, sortByMostRecent })]}
            checkHasData={checkHasData}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default MyActivity;
