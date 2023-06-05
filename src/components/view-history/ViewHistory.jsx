import { useTranslation } from 'react-i18next';
import React, {
  useState, useEffect,
  useRef,
  useContext,
} from 'react';
import getHistoryApi from 'apis/history/getHistoryApi';
import useAxios from 'hooks/useAxios';
import Moment from 'moment';
import ResponsivePagination from 'react-responsive-pagination';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useCacheRequest from 'hooks/useCacheRequest';
import CacheContext from 'contexts/CacheContext';
import i18n from 'i18n';
import Select from 'components/shared/form/select/Select';
import PropTypes from 'prop-types';
import Spinner from 'components/shared/spinner/Spinner';
import QueriesTable from './QueriesTable';
import QueryRow from './QueryRow';
import { LONG_DATE_12H_FORMAT } from '../../constants';

function ViewHistory({ updateWorkStreamId }) {
  const { t } = useTranslation('history');

  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { cachedRequests } = useContext(CacheContext);
  const [workstreams] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });
  const currentLang = i18n.language;
  const [selectedWorkStream, setSelectedWorkStream] = useState(1);
  const isMounted = useRef(false);

  function workstreamName(workstream) {
    return currentLang === 'ar' ? workstream.workstreamNameAr : workstream.workstreamName;
  }

  const WorkStreamsOptions = workstreams?.data?.map((workstream) => ({
    label: workstreamName(workstream),
    value: workstream.id,
  }));

  const onChangeWorkStream = (i) => {
    setSelectedWorkStream(WorkStreamsOptions?.find(
      (element) => element.value === i.value,
    ));
    updateWorkStreamId(i.value);
  };

  const [historyData, executeGetHistory] = useAxios(
    getHistoryApi({
      workstreamId: selectedWorkStream.value,
      page: currentPage,
      type: 'search',
      sort: 'mostRecent',
    }),
    { manual: true },
  );

  useEffect(() => {
    executeGetHistory();
  }, [currentPage, selectedWorkStream]);

  useEffect(() => {
    if (historyData.data) {
      if (!(historyData.loading) && historyData.data.code === 200) {
        setHistory(historyData.data.data?.data);
      }
    }
  }, [historyData]);

  const queriesHistory = {};
  const getHistoryPerPage = () => {
    for (let i = 0; i < history.length; i += 1) {
      if (!queriesHistory[Moment(history[i]?.timestamp).format(LONG_DATE_12H_FORMAT)]) {
        queriesHistory[Moment(history[i]?.timestamp)
          .format(LONG_DATE_12H_FORMAT)] = [history[i].payload.query];
      } else {
        queriesHistory[Moment(history[i]?.timestamp)
          .format(LONG_DATE_12H_FORMAT)].push(history[i].payload.query);
      }
    }
  };

  useEffect(() => {
    getHistoryPerPage();
  }, [currentPage,
    selectedWorkStream,
  ]);

  useEffect(() => {
    if (WorkStreamsOptions?.length) {
      setSelectedWorkStream(WorkStreamsOptions[0]);
      isMounted.current = true;
    }
  }, [workstreams, currentLang]);
  if (!isMounted.current) return <Spinner />;

  getHistoryPerPage();

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="px-md-19">
          <div className="d-flex my-8 p-8 app-bg-primary-01 rounded">
            <h5 className="mb-0 mt-4">{t('mySearchHistory')}</h5>
            <Select
              options={WorkStreamsOptions}
              moduleClassName="menu"
              selectedOption={selectedWorkStream}
              setSelectedOption={onChangeWorkStream}
              className="workStreams ms-3 mt-1 customSelect"
            />
          </div>
          <div className="mb-8">
            {
              historyData?.data?.pagination.totalPages > 0
                ? (
                  <>
                    {Object.keys(queriesHistory).map((keyName) => (
                      <div>
                        <h6 className="app-text-primary-dark mb-6">
                          {keyName}
                        </h6>
                        <QueriesTable>
                          {
                          queriesHistory[keyName].map((queru) => (
                            <QueryRow query={queru} selectedWorkStream={selectedWorkStream.value} />
                          ))
                        }
                        </QueriesTable>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>emptystate</p>
                )
            }
            {
              historyData?.data?.pagination.totalPages > 1 && (
                <ResponsivePagination
                  current={currentPage}
                  total={historyData?.data?.pagination.totalPages}
                  onPageChange={setCurrentPage}
                />
              )
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}
ViewHistory.propTypes = {
  updateWorkStreamId: PropTypes.func.isRequired,
};
export default ViewHistory;
