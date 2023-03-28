import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiInstance from 'apis/apiInstance';
import Pagination from 'react-responsive-pagination';
import { useSearchParams } from 'react-router-dom';
import './PaginationStyle.scss';
import Spinner from '../spinner/Spinner';

const AppPagination = ({
  axiosConfig, defaultPage, RenderedComponent, renderedProps,
  axiosInstance, fetchedTotalResults, emptyState, updateDependencies,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [data, setData] = useState(null);

  const axiosPaginatedConfig = {
    ...axiosConfig,
    params: { ...axiosConfig.params, page: currentPage },
  };

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
      setData(responseData?.data || responseData);
      setPaginationInfo(responsePaginationInfo);
      if (fetchedTotalResults) fetchedTotalResults(responsePaginationInfo.total);
    });
  }, [currentPage, ...updateDependencies]);

  if (!data) {
    return <div className="d-flex justify-content-center mt-18"><Spinner /></div>;
  }

  if (!paginationInfo.total) {
    return emptyState;
  }
  const totalNumberOfPages = Math.ceil(paginationInfo.total / paginationInfo.per_page);

  const renderedComponent = (
    <RenderedComponent data={data} {...renderedProps} />
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
};

AppPagination.defaultProps = {
  defaultPage: 1,
  renderedProps: {},
  axiosInstance: apiInstance,
  fetchedTotalResults: null,
  emptyState: null,
  updateDependencies: [],
};

export default AppPagination;
