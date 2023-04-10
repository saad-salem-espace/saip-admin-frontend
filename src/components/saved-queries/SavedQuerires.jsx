import { useTranslation } from 'react-i18next';
import apiInstance from 'apis/apiInstance';
import getSavedQueryApi from 'apis/save-query/getSavedQueryApi';
import Select from 'components/shared/form/select/Select';
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import AdvancedSearch from 'components/advanced-search/AdvancedSearch';
import SavedQueriresTable from './SavedQueriresTable';
import SavedQueryRow from './SavedQueryRow';

const SavedQuerires = () => {
  const { t } = useTranslation('queries');
  const [selectedWorkStream, setSelectedWorkStream] = useState({ label: t('patent'), value: 1 });
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
  const [queries, setQueries] = useState([]);

  const onChangeWorkStream = (i) => {
    setSelectedWorkStream(i);
  };

  const config = getSavedQueryApi(1, true);

  useEffect(() => {
    apiInstance.request(config).then((res) => {
      setQueries(res.data.data);
    });
  }, [queries]);

  return (
    <Container fluid>
      <Row>
        {/* <Col xxl={isAdvancedMenuOpen ? 3 : 1} xl={isAdvancedMenuOpen ? 4 : 1}
        className={`${isAdvancedMenuOpen ? 'expanded' : 'closed'} ps-0`}>
          <AdvancedSearch
            toggleAdvancedSearchMenu={toggleAdvancedSearchMenu}
            defaultInitializers={searchFields}
            isAdvancedMenuOpen={isAdvancedMenuOpen}
            submitRef={submitRef}
            workstreamId={searchResultParams.workstreamId}
            firstIdentifierStr={searchResultParams.identifierStrId}
            onChangeSearchQuery={setSearchQuery}
          />
        </Col> */}
        <Col md={11}>
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
          <SavedQueriresTable>
            {
          queries.map((query) => (
            <SavedQueryRow query={query} />
          ))
        }
          </SavedQueriresTable>
        </Col>
      </Row>
    </Container>
  );
};

export default SavedQuerires;
