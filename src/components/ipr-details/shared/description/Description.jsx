import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import { highlightListener } from 'utils/eventListeners';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';

const Description = ({
  description, children, className, isIPRExpanded, handleClick,
  examinerView,
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
          <div className="d-flex align-items-center">
            <HandleEmptyAttribute checkOn={description} />
            <KeywordPlannerButton handleClick={handleClick} btnPosition={btnPosition} />
          </div>
        </Col>
        {
       (children) && (
       <Col lg={5} md={6}>
         {children}
       </Col>
       )
      }
      </Row>
    </Container>
  );
};

Description.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  isIPRExpanded: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  examinerView: PropTypes.bool,
};

Description.defaultProps = {
  children: null,
  className: '',
  isIPRExpanded: false,
  examinerView: false,
};
export default Description;
