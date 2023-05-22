import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import KeywordPlannerButton from 'components/ipr-details/shared/seacrh-query/KeywordPlannerButton';
import LabelValue from './LabelValue';

const Description = ({
  description, children, className, isIPRExpanded, handleClick,
  examinerView,
}) => {
  const [left, setLeft] = useState();
  const [top, setTop] = useState();

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();

      if (!selection.toString()) {
        window.document.getElementById('col').classList.remove('added');
      } else if ((selection.anchorNode) === (selection.focusNode)) {
        setLeft(selection.getRangeAt(0).getBoundingClientRect().left);
        setTop(selection.getRangeAt(0).getBoundingClientRect().top);
        if (window.document.getElementById('col').contains(selection.anchorNode)) {
          window.document.getElementById('col').classList.add('added');
        }
      }
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
    <Container fluid className="px-0" id="col">
      <KeywordPlannerButton btnPosition={btnPosition} handleClick={handleClick} />
      <Row className="mx-0">
        <Col lg={(children && isIPRExpanded) ? 7 : 12} md={6} className={className}>
          <LabelValue
            label={description?.TechnicalField?.Title}
            value={description?.TechnicalField?.Paragraphs?.join('; ')}
          />
          <LabelValue
            label={description.BackgroundArt.Title}
            value={description?.BackgroundArt?.Paragraphs?.join('; ')}
          />
          <LabelValue
            label={description.Disclosure.Title}
            value={description?.Disclosure?.Paragraphs?.join('; ')}
          />
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
