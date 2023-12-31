import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-responsive-pagination';
import { useSearchParams } from 'react-router-dom';
import './PaginationStyle.scss';
import useIndexedDbWrapper from 'hooks/useIndexedDbWrapper';
import Spinner from '../spinner/Spinner';

const IndexedDbAppPagination = ({
  defaultPage, RenderedComponent, renderedProps,
  fetchedTotalResults, emptyState, updateDependencies, setResults,
  onPageChange, tableName, limit, indexMethod, indexMethodProps, resetPage, className,
  paginationWrapper, checkHasData,
}) => {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || defaultPage || 1);
  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const idbMethods = useIndexedDbWrapper(tableName);

  const changePage = (page) => {
    if (onPageChange) onPageChange(page);
    setCurrentPage(page);
  };
  const paginationInfo = data?.pagination || {
    per_page: 10,
    total: 0,
  };
  const displayData = data?.data;

  useEffect(() => {
    if (resetPage) {
      if (currentPage === 1) {
        setRefresh((prev) => prev + 1);
      } else {
        setCurrentPage(1);
      }
    }
  }, [resetPage]);

  useEffect(() => {
    const searchParamPage = Number(searchParams.get('page'));
    if (searchParamPage && searchParamPage !== currentPage) {
      setCurrentPage(searchParamPage);
    }
  }, [searchParams.get('page')]);

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    setSearchParams(searchParams);
    setData(null);
    setIsLoading(true);
    idbMethods[indexMethod]({
      ...indexMethodProps,
      onSuccess: (result) => { setData(result); },
      onError: () => { setData(null); },
      page: currentPage,
      limit,
    });
  }, [currentPage, refresh, ...updateDependencies]);

  useEffect(() => {
    if (data) {
      setResults(data.data);
      if (fetchedTotalResults) fetchedTotalResults(data.pagination?.total || 0);
      setIsLoading(false);
    }
  }, [data]);

  if (!data || isLoading) {
    return <div className="d-flex justify-content-center mt-18"><Spinner /></div>;
  }

  if (!paginationInfo.total) {
    checkHasData(paginationInfo.total);
    return emptyState;
  }

  if (paginationInfo.total) {
    checkHasData(paginationInfo.total);
  }

  const totalNumberOfPages = Math.ceil(paginationInfo.total / paginationInfo.per_page);
  const renderedComponent = (
    <RenderedComponent data={displayData} {...renderedProps} />
  );

  return (
    <>
      {renderedComponent}
      <div className={paginationWrapper}>
        <Pagination
          className={`pagination ${className}`}
          current={currentPage}
          total={totalNumberOfPages}
          onPageChange={changePage}
        />
      </div>
    </>
  );
};

IndexedDbAppPagination.propTypes = {
  defaultPage: PropTypes.number,
  RenderedComponent: PropTypes.func.isRequired,
  renderedProps: PropTypes.instanceOf(Object),
  fetchedTotalResults: PropTypes.func,
  emptyState: PropTypes.node,
  updateDependencies: PropTypes.arrayOf(Object),
  setResults: PropTypes.func,
  sort: PropTypes.string,
  onPageChange: PropTypes.func,
  tableName: PropTypes.string.isRequired,
  limit: PropTypes.number,
  indexMethod: PropTypes.string.isRequired,
  indexMethodProps: PropTypes.instanceOf(Object),
  resetPage: PropTypes.number,
  className: PropTypes.string,
  paginationWrapper: PropTypes.string,
  checkHasData: PropTypes.func,
};

IndexedDbAppPagination.defaultProps = {
  defaultPage: 1,
  renderedProps: {},
  sort: '',
  fetchedTotalResults: null,
  emptyState: null,
  updateDependencies: [],
  setResults: () => { },
  onPageChange: null,
  limit: 10,
  indexMethodProps: {},
  resetPage: 0,
  className: '',
  paginationWrapper: '',
  checkHasData: () => {},
};

export default IndexedDbAppPagination;
