import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FaSearch } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { documentApi } from 'apis/search/documentsApi';
import { getAttachmentURL } from 'utils/attachments';
import PropTypes from 'prop-types';
import Badge from 'components/shared/badge/Badge';
import Image from 'react-bootstrap/Image';
import Button from 'components/shared/button/Button';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import useAxios from 'hooks/useAxios';
import NoData from 'components/shared/empty-states/NoData';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import SearchQueryMenu from 'components/ipr-details/shared/seacrh-query/SearchQueryMenu';
import style from './ipr-details.module.scss';
import IprSections from './ipr-sections/IprSections';
import IprData from './IprData';
import IprControlAction from './IprControlAction';
import PatentViews from './patent/PatentViews';
import TrademarkViews from './trademarks/TrademarkViews';
import patentIprOptions from './patent/PatentIprOptions';
import trademarkIprOptions from './trademarks/TrademarkIprOptions';
import addIcon from '../../assets/images/icons/coloredAdd.svg';
import IndustrialDesignViews from './industrial-design/IndustrialDesignViews';
import IndustrialDesignIprOptions from './industrial-design/IndustrialDesignIprOptions';

function IprDetails({
  collapseIPR,
  isIPRExpanded,
  documentId,
  onClose,
  getNextDocument,
  getPreviousDocument,
  setActiveDocument,
  activeWorkstream,
  className,
  dashboard,
  showActions,
  activeTab,
  isCardInprogress,
  selectedCardId,
  setNotesUpdated,
  examinerView,
  fromFocusArea,
  hideFocus,
}) {
  const { t } = useTranslation('search', 'dashboard');
  const previousDocument = getPreviousDocument();
  const nextDocument = getNextDocument();
  const [validHighlight, setValidHighlight] = useState(false);
  const [highlightTrigger, setHighlightTrigger] = useState(0);
  const [document, setDocument] = useState(null);
  const [searchParams] = useSearchParams();
  const [selectedView, setSelectedView] = useState({
    label: t('ipr.bibliographic'),
    value: 'BibliographicData',
  });
  const patentOptions = patentIprOptions().options;
  const trademarkOptions = trademarkIprOptions().options;
  const industrialDesignOptions = IndustrialDesignIprOptions().options;
  const searchResultParams = {
    workstreamId:
      searchParams.get('workstreamId') || activeWorkstream.toString(),
  };
  const [, execute] = useAxios(
    documentApi({
      workstreamId: fromFocusArea
        ? JSON.parse(localStorage.getItem('FocusDoc'))?.workstreamId
        : searchResultParams.workstreamId,
      documentId,
    }),
    { manual: true },
  );

  const [showSearchQuery, setShowSearchQuery] = useState(false);

  const ShowSearchQueryMenu = () => {
    setShowSearchQuery(true);
  };
  const hideSearchQueryMenu = () => {
    setShowSearchQuery(false);
  };
  const ToggleSearchQueryMenu = () => {
    setShowSearchQuery(!showSearchQuery);
  };

  useEffect(() => {
    setDocument(null);
    if (documentId) {
      execute().then(({ data }) => {
        setDocument(data?.data?.[0]);
      });
    }
  }, [documentId]);

  useEffect(() => {
    if (document) {
      window.googleTranslateElementInit = () => {
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
          {
            autoDisplay: false,
          },
          'google_translate_element',
        );
      };
      const addScript = window.document.createElement('script');
      addScript.setAttribute(
        'src',
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
      );
      window.document.body.appendChild(addScript);
      return () => {
        window.document.body.removeChild(addScript);
        const elements = window.document.querySelectorAll('.skiptranslate');
        elements.forEach((element) => {
          element.remove();
        });
      };
    }
    return () => {};
  }, [document]);

  if (!document) {
    return null;
  }

  const preparedGetAttachmentURL = (fileName, fileType = 'image') => getAttachmentURL({
    workstreamId: searchResultParams.workstreamId,
    id: documentId,
    fileName,
    fileType,
  });

  const onChangeSelect = (i) => {
    setSelectedView(i);
  };

  const handleClick = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText && selection.anchorNode === selection.focusNode) {
      setValidHighlight(true);
    } else {
      setValidHighlight(false);
    }

    setHighlightTrigger((prev) => prev + 1);
  };

  const views = {
    1: (
      <PatentViews
        selectedView={selectedView.value}
        isIPRExpanded={isIPRExpanded}
        document={document}
        preparedGetAttachmentURL={preparedGetAttachmentURL}
        documentId={documentId}
        searchResultParams={searchResultParams}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
    2: (
      <TrademarkViews
        selectedView={selectedView.value}
        isIPRExpanded={isIPRExpanded}
        document={document}
        preparedGetAttachmentURL={preparedGetAttachmentURL}
        documentId={documentId}
        searchResultParams={searchResultParams}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
    3: (
      <IndustrialDesignViews
        selectedView={selectedView.value}
        isIPRExpanded={isIPRExpanded}
        document={document}
        preparedGetAttachmentURL={preparedGetAttachmentURL}
        documentId={documentId}
        searchResultParams={searchResultParams}
        handleClick={handleClick}
        examinerView={examinerView}
      />
    ),
  };

  const options = {
    1: patentOptions,
    2: trademarkOptions,
    3: industrialDesignOptions,
  };

  const renderSelectedView = () => {
    let content = <NoData />;
    const workstreamId = fromFocusArea
      ? JSON.parse(localStorage.getItem('FocusDoc'))?.workstreamId
      : searchResultParams.workstreamId;
    if (workstreamId.toString() === '2') {
      if (
        document[selectedView.value]
        || ((selectedView.value === 'Description'
          || selectedView.value === 'Mark')
          && document.BibliographicData[selectedView.value])
      ) {
        content = views[workstreamId];
      }
    } else if (workstreamId.toString() === '1') {
      if (document[selectedView.value]) {
        content = views[workstreamId];
      }
    } else if (workstreamId.toString() === '3') {
      if (
        document[selectedView.value]
        || selectedView.value === 'Description'
      ) {
        content = views[workstreamId];
      }
    }
    return content;
  };
  return (
    <div className={`${style.iprWrapper} ${className}`} translate="yes">
      <div className="border-bottom bg-primary-01">
        <div className="d-flex justify-content-between mb-2 px-6 pt-5">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faBookmark}
              className="me-3 f-22 text-primary-dark"
            />
            <h5 className="mb-0">
              {document.BibliographicData.PublicationNumber}
            </h5>
          </div>
          <div className="d-flex">
            {!dashboard && (
              <div dir="ltr" className="border-end me-4">
                <Button
                  variant="link"
                  className="p-0 pe-5"
                  text={
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      className="md-text text-gray"
                    />
                  }
                  disabled={!previousDocument}
                  onClick={() => setActiveDocument(previousDocument)}
                />
                <Button
                  variant="link"
                  className="p-0 pe-5 "
                  text={
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="md-text text-gray"
                    />
                  }
                  disabled={!nextDocument}
                  onClick={() => setActiveDocument(nextDocument)}
                />
              </div>
            )}
            {showActions && (
              <IprControlAction
                collapseIPR={collapseIPR}
                isIPRExpanded={isIPRExpanded}
                onClose={onClose}
              />
            )}
          </div>
        </div>
        {searchResultParams.workstreamId === '2' && (
          <div className="ms-6 mb-2">
            <Badge
              text={document.BibliographicData.TrademarkLastStatus}
              varient="secondary"
              className="text-capitalize me-2 mb-4"
            />
            <div className="d-flex justify-content-between">
              <div className="me-2 mb-md-0 mb-2">
                <h5 className="text-capitalize text-primary-dark font-regular mb-2">
                  {document.BibliographicData.BrandNameEn}
                  <span className="d-block mt-2">
                    {document.BibliographicData.BrandNameAr}
                  </span>
                </h5>
                <p className="text-gray">
                  <HandleEmptyAttribute
                    checkOn={document?.BibliographicData?.Owners?.join('; ')}
                  />
                </p>
              </div>
              {!isIPRExpanded && (
                <div className={`me-6 mb-2 ${style.headerImg}`}>
                  <Image
                    src={preparedGetAttachmentURL(
                      document.BibliographicData.Mark,
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {searchResultParams.workstreamId === '3' && (
          <div className="ms-6 mb-2">
            <div className="d-flex justify-content-between">
              <div className="me-2 mb-md-0 mb-2">
                <h5 className="text-capitalize text-primary-dark font-regular mb-2">
                  {document.BibliographicData.DesignTitleEN}
                  <span className="d-block mt-2">
                    {document.BibliographicData.DesignTitleAR}
                  </span>
                </h5>
                <p className="text-gray">
                  <HandleEmptyAttribute
                    checkOn={document?.BibliographicData?.Designers?.join('; ')}
                  />
                </p>
              </div>
              {!isIPRExpanded && (
                <div className={`me-6 mb-2 ${style.headerImg}`}>
                  <Image
                    src={preparedGetAttachmentURL(
                      document?.BibliographicData?.OverallProductDrawing,
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {searchResultParams.workstreamId === '1' && (
          <p className="text-gray px-6">
            <HandleEmptyAttribute
              checkOn={document.BibliographicData.ApplicationTitle}
            />
          </p>
        )}
        <div
          className="border-top py-3 px-6 d-xxl-flex align-items-start position-relative"
          translate="no"
        >
          <Button
            disabled
            variant="primary"
            text={
              <>
                <FaSearch className="fs-base me-2" />
                {t('search:findSimilar')}
              </>
            }
            className="me-4 fs-sm my-2 my-xxl-0"
          />
          <Button
            disabled
            variant="primary"
            text={
              <>
                <FiDownload className="fs-base me-2" />
                {t('search:download')}
              </>
            }
            className="me-4 fs-sm my-2 my-xxl-0"
          />
          <div id="google_translate_element" className="d-inline-block" />
          {examinerView && (
            <SearchQueryMenu
              showSearchQuery={showSearchQuery}
              ShowSearchQueryMenu={ShowSearchQueryMenu}
              ToggleSearchQueryMenu={ToggleSearchQueryMenu}
              hideSearchQueryMenu={hideSearchQueryMenu}
              validHighlight={validHighlight}
              hideFocus={hideFocus}
              highlightTrigger={highlightTrigger}
            >
              <AppTooltip
                className="w-auto"
                placement="top"
                tooltipContent={t('dashboard:board.addtoKeywordPlanner')}
                tooltipTrigger={
                  <div>
                    <Button
                      variant="link"
                      className="text-primary-dark font-regular fs-sm text-decoration-none"
                      onClick={() => {
                        ToggleSearchQueryMenu();
                      }}
                      text={
                        <>
                          <Image src={addIcon} />
                          <span className="px-2">
                            {t('dashboard:board.keywordplanner')}
                          </span>
                          <FontAwesomeIcon
                            icon={showSearchQuery ? faChevronUp : faChevronDown}
                          />
                        </>
                      }
                    />
                  </div>
                }
              />
              {/* eslint-disable-next-line react/jsx-closing-tag-location */}
            </SearchQueryMenu>
          )}
        </div>
      </div>
      {dashboard && showActions ? (
        <IprSections
          options={options[searchResultParams.workstreamId]}
          onChangeSelect={onChangeSelect}
          selectedView={selectedView}
          renderSelectedView={renderSelectedView}
          documentId={documentId}
          activeTab={activeTab}
          isCardInprogress={isCardInprogress}
          selectedCardId={selectedCardId}
          setNotesUpdated={setNotesUpdated}
          className="notes-editor-container"
          activeWorkstream={activeWorkstream}
          fromFocusArea={fromFocusArea}
        />
      ) : (
        <IprData
          options={options[searchResultParams.workstreamId]}
          onChangeSelect={onChangeSelect}
          selectedView={selectedView}
          renderSelectedView={renderSelectedView}
        />
      )}
    </div>
  );
}

IprDetails.propTypes = {
  collapseIPR: PropTypes.func.isRequired,
  isIPRExpanded: PropTypes.bool.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func,
  getNextDocument: PropTypes.func,
  getPreviousDocument: PropTypes.func,
  setActiveDocument: PropTypes.func,
  activeWorkstream: PropTypes.number,
  className: PropTypes.string,
  dashboard: PropTypes.bool,
  showActions: PropTypes.bool,
  activeTab: PropTypes.number,
  isCardInprogress: PropTypes.bool.isRequired,
  selectedCardId: PropTypes.number.isRequired,
  setNotesUpdated: PropTypes.func,
  examinerView: PropTypes.bool,
  fromFocusArea: PropTypes.bool,
  hideFocus: PropTypes.func,
};

IprDetails.defaultProps = {
  documentId: null,
  className: null,
  activeWorkstream: null,
  onClose: () => {},
  getNextDocument: () => {},
  getPreviousDocument: () => {},
  setActiveDocument: () => {},
  dashboard: false,
  showActions: true,
  examinerView: false,
  activeTab: 2,
  setNotesUpdated: () => {},
  fromFocusArea: false,
  hideFocus: () => {},
};

export default IprDetails;
