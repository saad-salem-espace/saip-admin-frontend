import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiInstance from 'apis/apiInstance';
import Pagination from 'react-responsive-pagination';
import { useSearchParams } from 'react-router-dom';
import './PaginationStyle.scss';

const AppPagination = ({
  axiosConfig, defaultPage, RenderedComponent, renderedProps, axiosInstance, fetchedTotalResults,
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
  }, [currentPage]);

  if (!data) {
    // TODO Change this part to empty state
    return null;
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
};

AppPagination.defaultProps = {
  defaultPage: 1,
  renderedProps: {},
  axiosInstance: apiInstance,
  fetchedTotalResults: null,
};

export default AppPagination;
