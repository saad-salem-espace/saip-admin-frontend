import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';
import DefineFeature from './DefineFeature';
import './user-manual.scss';

function UserManual() {
  const { t } = useTranslation('search');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([
    {
      id: 1,
      title: (t('help:firstFeatureTitle')),
      tags: t('help:firstFeatureTags').split(', '),
      pdfLink: (t('help:firstFeaturePdfLink')),
      active: true,
    },
    {
      id: 2,
      title: (t('help:secondFeatureTitle')),
      tags: t('help:secondFeatureTags').split(', '),
      pdfLink: (t('help:secondFeaturePdfLink')),
      active: false,
    },
    {
      id: 3,
      title: (t('help:thirdFeatureTitle')),
      tags: t('help:thirdFeatureTags').split(', '),
      pdfLink: (t('help:secondFeaturePdfLink')),
      active: false,
    },
    {
      id: 4,
      title: (t('help:fourthFeatureTitle')),
      tags: t('help:fourthFeatureTags').split(', '),
      pdfLink: (t('help:secondFeaturePdfLink')),
      active: false,
    },
    {
      id: 5,
      title: (t('help:fifthFeatureTitle')),
      tags: t('help:fifthFeatureTags').split(', '),
      pdfLink: (t('help:secondFeaturePdfLink')),
      active: false,
    },
  ]);

  const handleButtonClick = (index) => {
    setData(
      data.map((item, i) => ({
        ...item,
        active: i === index ? !item.active : false,
      })),
    );
  };

  const searchTerm = search.toLowerCase();

  const filteredData = data.filter((item) => {
    const titleMatch = typeof item.title === 'string'
      && item.title.toLowerCase().includes(searchTerm);
    const tagMatch = Array.isArray(item.tags)
      ? item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      : false;

    return titleMatch || tagMatch;
  });

  const activePdf = data.find((item) => item.active);

  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <div className="user-manual-sections p-1">
            <div className="search-wrapper">
              <InputGroup className="mb-3 position-relative">
                <Form.Control
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t('search:search')}
                  className="col-12"
                />
                <Button
                  variant="primary"
                  className="position-absolute btn-filter appBtn"
                >
                  <IoIosSearch className="icon fs-29" />
                </Button>
              </InputGroup>
            </div>
            <div className="fixed-scroll">
              <DefineFeature data={filteredData} onButtonClick={handleButtonClick} />
            </div>
          </div>
        </Col>
        <Col lg={9}>
          <div className="show-content border shadow p-5 rounded">
            {activePdf && (
              <iframe
                src={activePdf.pdfLink}
                title={activePdf.title}
                width="100%"
                height="600px"
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UserManual;
