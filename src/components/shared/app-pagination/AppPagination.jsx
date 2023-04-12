/* eslint-disable */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiInstance from 'apis/apiInstance';
import Pagination from 'react-responsive-pagination';
import { useSearchParams } from 'react-router-dom';
import './PaginationStyle.scss';
import useAxios from 'hooks/useAxios';
import Spinner from '../spinner/Spinner';

const AppPagination = ({
  axiosConfig, defaultPage, RenderedComponent, renderedProps,
  axiosInstance, fetchedTotalResults, emptyState, updateDependencies, setResults,
  sort,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const axiosPaginatedConfig = {
    ...axiosConfig,
    params: { ...axiosConfig.params, sort, page: currentPage },
  };

  useEffect(() => {
    setCurrentPage('1');
  }, [sort]);

  const [{ data }, execute] = useAxios(axiosPaginatedConfig, { manual: true }, axiosInstance);

  const paginationInfo = data?.pagination || {
    per_page: 10,
    total: 0,
  }
  const displayData = data?.data;

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')) || currentPage);
  }, [searchParams.get('page')]);

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
    execute();
  }, [currentPage, sort, ...updateDependencies]);

  useEffect(() => {
    if(data){
      setResults(data.data);
      fetchedTotalResults(data.pagination?.total || 0);
    }
  }, [data]);

  if (!data) {
    return <div className="d-flex justify-content-center mt-18"><Spinner /></div>;
  }
  if (!paginationInfo.total) {
    return emptyState;
  }
  const totalNumberOfPages = Math.ceil(paginationInfo.total / paginationInfo.per_page);
  const renderedComponent = (
    <RenderedComponent data={displayData} {...renderedProps} />
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
};

export default AppPagination;
