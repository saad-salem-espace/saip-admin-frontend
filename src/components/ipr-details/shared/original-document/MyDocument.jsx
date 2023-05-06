import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import Button from 'components/shared/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './original-document.scss';
import ViewPort from 'components/shared/view-port/ViewPort';
import useAxios from 'hooks/useAxios';
import PropTypes from 'prop-types';

function MyDocument({ config }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [document, setDocument] = useState();
  const [{ data }, execute] = useAxios(config);

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (data) {
      setDocument(data);
    }
  }, [data]);

  const onDocumentLoadSuccess = () => {
    setPageNumber(1);
  };
  return (
    <div className="pdf-viewer-wrapper">
      <div className="text-center mb-5">
        <Button
          variant="link"
          className="shadow me-4 rounded-circle"
          onClick={() => setPageNumber(pageNumber - 1)}
          text={<FontAwesomeIcon
            icon={faChevronLeft}
            className="text-primary fs-18"
          />}
          size="sm"
        />
        <Button
          variant="link"
          className="shadow rounded-circle"
          onClick={() => setPageNumber(pageNumber + 1)}
          text={<FontAwesomeIcon
            icon={faChevronRight}
            className="text-primary fs-18"
          />}
          size="sm"
        />
      </div>
      <Document
        file={{ data: document }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Container>
          <Row className="g-0">
            <ViewPort size="xl">
              <Col lg={6} className="border-end">
                <div className="me-3">
                  <Page pageNumber={pageNumber} />
                </div>
              </Col>
              <Col lg={6}>
                <div className="ms-3">
                  <Page pageNumber={pageNumber + 1} />
                </div>
              </Col>
            </ViewPort>
            <ViewPort size="ltXl" renderOnServer>
              <Col md={12} className="mx-auto shadow">
                <div>
                  <Page pageNumber={pageNumber} />
                </div>
              </Col>
            </ViewPort>
          </Row>
        </Container>
      </Document>
    </div>
  );
}
MyDocument.propTypes = {
  config: PropTypes.instanceOf(Object).isRequired,
};

export default MyDocument;
