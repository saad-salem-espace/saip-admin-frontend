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
  sort, onPageChange, className
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(defaultPage || 1);
  const [isLoading, setIsLoading] = useState(true);

  const changePage = (page) => {
    if(onPageChange) onPageChange(page);
    setCurrentPage(page);
  }

  const axiosPaginatedConfig = {
    ...axiosConfig,
    params: { ...axiosConfig.params, sort, page: currentPage },
  };

  useEffect(() => {
    setCurrentPage('1');
  }, [sort,updateDependencies ]);

  const [{ data }, execute] = useAxios(axiosPaginatedConfig, { manual: true }, axiosInstance);

  const paginationInfo = data?.pagination || {
    totalElements: 0,
    totalPages: 0
  }
  const displayData = data?.data;

  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')) || currentPage);
  }, [searchParams.get('page')]);

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
    setIsLoading(true);
    execute();

  }, [currentPage, sort, ...updateDependencies, data]);

  useEffect(() => {
    if(data){
      setResults(data.data);
      fetchedTotalResults(data.pagination?.totalElements || 0);
      setIsLoading(false);
    }
  }, [data]);

  if (!data || isLoading) {
    return <div className="d-flex justify-content-center mt-18"><Spinner /></div>;
  }
  if (!paginationInfo.totalElements) {
    return emptyState;
  }

  const renderedComponent = (
    <RenderedComponent data={displayData} {...renderedProps} />
  );

  return (
    <>
      {renderedComponent}
      <Pagination
        className={`pagination ${className}`}
        current={currentPage}
        total={paginationInfo.totalPages}
        onPageChange={changePage}
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
  onPageChange: PropTypes.func,
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
  onPageChange: null
};

export default AppPagination;
