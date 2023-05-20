import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import ShowMore from 'components/shared/show-more/ShowMore';
import highlightTextContext from './shared/context/highlightTextContext';
import HandleEmptyAttribute from '../shared/empty-states/HandleEmptyAttribute';
import LabelValue from './shared/label-value/LabelValue';

const BibliographicDataSection = ({
  document, isIPRExpanded, children, hideSearchQueryMenu, showSearchQuery,
  ShowSearchQueryMenu, toggleIcon, upArrow,
}) => {
  const { t } = useTranslation('search');
  const [highlightedText, setHighlightedText] = useState('');
  const [anchorNode, setAnchorNode] = useState(null);
  const { BibliographicData } = document;
  const getGrid = (view) => {
    let grid = 12;
    if (isIPRExpanded) {
      if (view === 'drawings') {
        grid = 5;
      } else {
        grid = 7;
      }
    }
    return grid;
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      // console.log(`Selected text: ${window.getSelection().toString()}`);
      // console.log(window.getSelection());
      const selection = window.getSelection();
      const selectedText = selection.toString();
      console.log(selectedText);
      // React.createElement()
      // const para = window.document.createElement('p');
      // const node = window.document.createTextNode('This is a paragraph.');
      // para.appendChild(node);
      // selection.anchorNode.parentElement.classList.add('added')
      if ((selection.anchorNode) === (selection.focusNode)) {
        setHighlightedText(selectedText);
        if (selection.anchorNode !== anchorNode) {
          setAnchorNode(selection.anchorNode);
        }
        // selection.anchorNode.parentNode.appendChild(para);
      } else {
        if (highlightedText) {
          setHighlightedText('');
        }
        console.log('not working');
      }
    };
    window.document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      window.document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <highlightTextContext.Provider value={highlightedText}>
      <Row>
        <Col md={getGrid('bibliographic')}>
          <h6 className="mt-8 mb-4">{t('register')}</h6>
          <LabelValue
            label={t('applicants')}
            value={document?.Applicants?.join('; ')}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
          />
          <LabelValue
            label={t('inventors')}
            value={document?.Inventors?.join('; ')}
            className="mb-4"
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
          />
          <div>
            <p className="text-primary f-14">{t('classifications')}</p>
            <LabelValue
              label={t('ipc')}
              value={document?.IPCClassification?.IPC?.join('; ')}
              className="f-12 mb-5"
              customLabel
              hideSearchQueryMenu={hideSearchQueryMenu}
              showSearchQuery={showSearchQuery}
              ShowSearchQueryMenu={ShowSearchQueryMenu}
            />
          </div>
          <LabelValue
            label={t('cpc')}
            value={document?.CPCClassification?.CPC?.join('; ')}
            className="f-12 mb-5"
            customLabel
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
          />
          {/* <div className="d-flex">
          <p className={`text-primary f-14 ${style.label}`}>{t('priorities')}</p>
          <p className="f-12">
            <HandleEmptyAttribute checkOn={document?.Priorities} />
          </p>
        </div> */}
          <LabelValue
            label={t('application')}
            value={BibliographicData?.Application}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
          />
          <LabelValue
            label={t('publication')}
            value={
              <>
                {BibliographicData?.PublicationNumber}
                {' '}
                {BibliographicData?.PublicationDate}
              </>
          }
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
          />
          <LabelValue
            label={t('publishedAs')}
            value={document?.Priorities?.PublishedAs}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
          />
          <p className="text-primary f-14">{t('abstract')}</p>
          <LabelValue
            value={
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData?.ApplicationAbstract.join(' ')} />
              </ShowMore>
          }
            valueClassName="f-14"
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
          />
        </Col>
        <Col md={getGrid('drawings')} className={isIPRExpanded ? 'border-start' : ''}>
          {children}
        </Col>
      </Row>
    </highlightTextContext.Provider>
  );
};

BibliographicDataSection.propTypes = {
  document: PropTypes.shape({
    BibliographicData: PropTypes.shape({
      Application: PropTypes.string,
      PublicationNumber: PropTypes.string,
      PublicationDate: PropTypes.string,
      ApplicationAbstract: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    Applicants: PropTypes.arrayOf(PropTypes.string),
    Inventors: PropTypes.arrayOf(PropTypes.string),
    IPCClassification: PropTypes.shape({
      IPC: PropTypes.arrayOf(PropTypes.string),
    }),
    CPCClassification: PropTypes.shape({
      CPC: PropTypes.arrayOf(PropTypes.string),
    }),
    Priorities: PropTypes.shape({
      PublishedAs: PropTypes.string,
    }),
    Drawings: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isIPRExpanded: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  showSearchQuery: PropTypes.bool,
  hideSearchQueryMenu: PropTypes.func,
  ShowSearchQueryMenu: PropTypes.func,
  toggleIcon: PropTypes.func.isRequired,
  upArrow: PropTypes.bool.isRequired,
};

BibliographicDataSection.defaultProps = {
  hideSearchQueryMenu: () => { },
  ShowSearchQueryMenu: () => { },
  showSearchQuery: false,
};

export default BibliographicDataSection;
