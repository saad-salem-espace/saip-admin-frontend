import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Document, Page } from 'react-pdf';
import './original-document.scss';
import ViewPort from 'components/shared/view-port/ViewPort';
import PropTypes from 'prop-types';
import OriginalDocumentsNavButtons from './OriginalDocumentsNavButtons';
import PageViewer from './PageViewer';

function MyDocument({
  documents, hasNext, hasPrevious, previousDocument, nextDocument, activeIndex,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isBackward, setIsBackward] = useState(false);
  const [refreshView, setRefreshView] = useState(0);
  const [step, setStep] = useState(2);

  const forwardButtonEnabled = pageNumber < totalPages || hasNext;
  const backwardButtonEnabled = pageNumber > 1 || hasPrevious;

  const forwardClick = () => {
    if (pageNumber < totalPages && pageNumber + step <= totalPages) {
      setPageNumber((page) => page + step);
    } else {
      nextDocument();
    }
  };
  const backwardClick = () => {
    if (pageNumber > 1) {
      setPageNumber((page) => page - step);
    } else {
      previousDocument();
      setIsBackward(true);
    }
  };

  const onDocumentLoadSuccess = (meta) => {
    setPageNumber(1);
    setTotalPages(meta.numPages);
    setRefreshView((view) => view + 1);
  };

  useEffect(() => {
    if (isBackward) {
      setPageNumber(totalPages);
      setIsBackward(false);
    }
  }, [refreshView]);

  return (
    <div className="pdf-viewer-wrapper">
      <OriginalDocumentsNavButtons
        forward={{ onClick: forwardClick, isDisabled: !forwardButtonEnabled }}
        backward={{ onClick: backwardClick, isDisabled: !backwardButtonEnabled }}
      />
      <Document
        file={documents[activeIndex]}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {!isBackward && (
          <Container>
            <Row className="g-0">
              <ViewPort size="xl">
                <PageViewer setStep={setStep} step={2}>
                  {pageNumber >= 1 && pageNumber <= totalPages && (
                    <Col lg={6} className="border-end">
                      <div className="me-3">
                        <Page pageNumber={pageNumber} />
                      </div>
                    </Col>
                  )}
                  {pageNumber + 1 <= totalPages && (
                    <Col lg={6}>
                      <div className="ms-3">
                        <Page pageNumber={pageNumber + 1} />
                      </div>
                    </Col>
                  )}
                </PageViewer>
              </ViewPort>
              <ViewPort size="ltXl" renderOnServer>
                <PageViewer setStep={setStep} step={1}>
                  <Col md={12} className="mx-auto shadow">
                    <div>
                      <Page pageNumber={pageNumber} />
                    </div>
                  </Col>
                </PageViewer>
              </ViewPort>
            </Row>
          </Container>
        )}
      </Document>
    </div>
  );
}
MyDocument.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  previousDocument: PropTypes.func.isRequired,
  nextDocument: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

export default MyDocument;
