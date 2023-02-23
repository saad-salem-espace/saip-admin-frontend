import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import apiInstance from 'apis/apiInstance';
import Pagination from 'react-responsive-pagination';
import './PaginationStyle.scss';

const AppPagination = ({
  axiosConfig, defaultPage, RenderedComponent, RenderedProps, axiosInstance,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [data, setData] = useState(null);

  const axiosPaginatedConfig = {
    ...axiosConfig,
    params: { ...axiosConfig.params, page: currentPage },
  };

  useEffect(() => {
    axiosInstance.request(axiosPaginatedConfig).then((response) => {
      setData(response.data);
    });
  }, [currentPage]);

  if (!data) {
    return null;
  }

  const renderedComponent = (
    <RenderedComponent data={data} {...RenderedProps} />
  );

  return (
    <>
      {renderedComponent}
      <Pagination
        current={currentPage}
        total={10}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

AppPagination.propTypes = {
  axiosConfig: PropTypes.instanceOf(Object).isRequired,
  defaultPage: PropTypes.number,
  RenderedComponent: PropTypes.func.isRequired,
  RenderedProps: PropTypes.instanceOf(Object),
  axiosInstance: PropTypes.func,
};

AppPagination.defaultProps = {
  defaultPage: 1,
  RenderedProps: {},
  axiosInstance: apiInstance,
};

export default AppPagination;
