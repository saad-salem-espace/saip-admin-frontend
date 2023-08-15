import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import { highlightListener } from 'utils/eventListeners';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const Claims = ({
  claims, children, className, isIPRExpanded,
  handleClick, examinerView,
}) => {
  const [left, setLeft] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    const handleSelectionChange = () => {
      highlightListener(setLeft, setTop);
    };
    if (examinerView) {
      window.document.addEventListener('selectionchange', handleSelectionChange);
    }
    return () => {
      window.document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const btnPosition = {
    left: `${left + 17}px`,
    top: `${top - 38}px`,
  };

  return (
    <Container fluid className="px-0">
      <Row className="mx-0">
        <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className} id="col">
          {
          claims.map((c) => (
            <div className="d-flex align-items-center">
              <p>
                {c.Text}
                <KeywordPlannerButton handleClick={handleClick} btnPosition={btnPosition} />
              </p>
            </div>
          ))
        }

        </Col>
        {
        (children) && (
          <Col md={isIPRExpanded ? 5 : 12} className={isIPRExpanded ? 'border-start' : ''}>
            {children}
          </Col>
        )
      }
      </Row>
    </Container>
  );
};

Claims.propTypes = {
  children: PropTypes.node,
  claims: PropTypes.string.isRequired,
  className: PropTypes.string,
  isIPRExpanded: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

Claims.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
  examinerView: false,
};
export default Claims;
