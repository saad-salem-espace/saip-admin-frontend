import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiInstance from 'apis/apiInstance';
import Pagination from 'react-responsive-pagination';
import { useSearchParams } from 'react-router-dom';
import './PaginationStyle.scss';
import Spinner from '../spinner/Spinner';

const AppPagination = ({
  axiosConfig, defaultPage, RenderedComponent, renderedProps,
  axiosInstance, fetchedTotalResults, emptyState, updateDependencies, setResults,
  sort, setIsQuerySaved,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [data, setData] = useState(null);
  const [highlghtWords, setHighlghtWords] = useState([]);

  const axiosPaginatedConfig = {
    ...axiosConfig,
    params: { ...axiosConfig.params, sort, page: currentPage },
  };

  useEffect(() => {
    setCurrentPage('1');
  }, [sort]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')) || currentPage);
  }, [searchParams.get('page')]);

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
    axiosInstance.request(axiosPaginatedConfig).then((response) => {
      const responseData = response.data;
      const responsePaginationInfo = responseData?.pagination || {
        per_page: 10,
        total: 0,
      };
      setHighlghtWords(responseData.data?.highlighting || []);
      setData(responseData?.data.data || responseData);
      setResults(responseData?.data.data || responseData);
      setIsQuerySaved(responseData.data?.isFavourite || false);
      setPaginationInfo(responsePaginationInfo);
      if (fetchedTotalResults) fetchedTotalResults(responsePaginationInfo.total);
    });
  }, [currentPage, sort, ...updateDependencies]);

  if (!data) {
    return <div className="d-flex justify-content-center mt-18"><Spinner /></div>;
  }

  if (!paginationInfo.total) {
    return emptyState;
  }
  const totalNumberOfPages = Math.ceil(paginationInfo.total / paginationInfo.per_page);

  const renderedComponent = (
    <RenderedComponent data={data} highlghtWords={highlghtWords} {...renderedProps} />
  );

  return (
    <>
      {renderedComponent}
      <Pagination
        className="pagination"
        current={currentPage}
        total={totalNumberOfPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

AppPagination.propTypes = {
  axiosConfig: PropTypes.instanceOf(Object).isRequired,
  defaultPage: PropTypes.number,
  RenderedComponent: PropTypes.func.isRequired,
  renderedProps: PropTypes.instanceOf(Object),
  axiosInstance: PropTypes.func,
  fetchedTotalResults: PropTypes.func,
  emptyState: PropTypes.node,
  updateDependencies: PropTypes.arrayOf(Object),
  setResults: PropTypes.func,
  sort: PropTypes.string,
  setIsQuerySaved: PropTypes.func,
};

AppPagination.defaultProps = {
  defaultPage: 1,
  renderedProps: {},
  sort: '',
  axiosInstance: apiInstance,
  fetchedTotalResults: null,
  emptyState: null,
  updateDependencies: [],
  setResults: () => {},
  setIsQuerySaved: () => {},
};

export default AppPagination;
