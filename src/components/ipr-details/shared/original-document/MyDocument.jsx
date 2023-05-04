import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from 'components/shared/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './original-document.scss';

function MyDocument() {
  const url = '/sample.pdf';
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [pageNumber, setPageNumber] = useState(1);

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
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Container>
          <Row className="g-0">
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
            {/* TODO:IP-655 One page */}
            {/* <Col lg={8} className="mx-auto shadow">
              <div>
                <Page pageNumber={pageNumber} />
              </div>
            </Col> */}
          </Row>
        </Container>
      </Document>
    </div>
  );
}

export default MyDocument;
