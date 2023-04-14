import { useTranslation } from 'react-i18next';
import getSavedQueryApi from 'apis/save-query/getSavedQueryApi';
import Select from 'components/shared/form/select/Select';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import AppPagination from 'components/shared/app-pagination/AppPagination';
import NoData from 'components/shared/empty-states/NoData';
import { useSearchParams } from 'react-router-dom';
import SavedQueriresTable from './SavedQueriresTable';

const SavedQuerires = () => {
  const { t } = useTranslation('queries');
  const [selectedWorkStream, setSelectedWorkStream] = useState({ label: t('patent'), value: 1 });
  const [searchParams] = useSearchParams();

  const WorkStreamsOptions = [
    {
      label: t('patent'),
      value: 1,
    },
    {
      label: t('trademark'),
      value: 2,
    },
  ];

  const onChangeWorkStream = (i) => {
    setSelectedWorkStream(i);
  };

  const axiosConfig = getSavedQueryApi(selectedWorkStream.value, true);

  const savedQueries = (
    SavedQueriresTable
  );
  return (
    <Container fluid>
      <Row>
        <Col md={12} className="px-md-19">
          <div className="d-flex my-8 p-8 bg-primary-01 rounded">
            <h5 className="mb-0 mt-4">{t('myQueries')}</h5>
            <Select
              options={WorkStreamsOptions}
              moduleClassName="menu"
              selectedOption={selectedWorkStream}
              setSelectedOption={onChangeWorkStream}
              className="workStreams me-5 ms-3 mt-1 customSelect"
            />
          </div>
          <AppPagination
            axiosConfig={axiosConfig}
            defaultPage={Number(searchParams.get('page') || '1')}
            RenderedComponent={
              savedQueries
            }
            emptyState={(
              <NoData />)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SavedQuerires;
