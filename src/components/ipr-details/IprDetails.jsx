import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FaSearch } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { useEffect, useState } from 'react';
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
import Carousel from 'components/shared/carousel/Carousel';
import style from './ipr-details.module.scss';
import BibliographicDataSection from './BibliographicDataSection';
import TrademarkBibliographic from './trademarks/bibliographic-data-section/BibliographicDataSection';
import LegalStatus from './shared/legal-status/LegalStatus';
import LegalStatusRow from './shared/legal-status/LegalStatusRow';
import Applicants from './shared/applicants/Applicants';
import ApplicantRow from './shared/applicants/ApplicantRow';
import Owners from './shared/owners/Owners';
import OwnerRow from './shared/owners/OwnerRow';
import Representatives from './shared/representatives/Representatives';
import RepresentativeRow from './shared/representatives/RepresentativeRow';
import OfficeActions from './shared/office-actions/OfficeActions';
import OfficeActionRow from './shared/office-actions/OfficeActionRow';
import GoodsAndServices from './trademarks/goods-and-services/GoodsAndServices';
import GoodsAndServicesRow from './trademarks/goods-and-services/GoodsAndServicesRow';
import FigurativeClassification from './trademarks/figurative-classification/FigurativeClassification';
import FigurativeClassificationRow from './trademarks/figurative-classification/FigurativeClassificationRow';
import Exhibitions from './trademarks/exhibitions/Exhibitions';
import ExhibitionRow from './trademarks/exhibitions/ExhibitionRow';
import Priorities from './shared/priorities/Priorities';
import PriorityRow from './shared/priorities/PriorityRow';
import Description from './shared/description/Description';
import PatentDescription from './patent/description/Description';
import ImageWithZoom from './shared/image-with-zoom/ImageWithZoom';
import Citations from './patent/citations/Citations';
import CitationRow from './patent/citations/CitationRow';
import Inventors from './patent/inventors/Inventors';
import InventorRow from './patent/inventors/InventorRow';
import PatentFamility from './patent/patent-famility/PatentFamility';
import PatentFamilityRow from './patent/patent-famility/PatentFamilityRow';
import Claims from './patent/claims/Claims';
import IprSections from './ipr-sections/IprSections';
import IprData from './IprData';
import IprControlAction from './IprControlAction';
import OriginalDocument from './shared/original-document/OriginalDocument';

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
}) {
  const { t, i18n } = useTranslation('search', 'dashboard');
  const previousDocument = getPreviousDocument();
  const nextDocument = getNextDocument();
  const [searchParams] = useSearchParams();
  const [selectedView, setSelectedView] = useState({
    label: t('ipr.bibliographic'),
    value: 'BibliographicData',
  });
  const searchResultParams = {
    workstreamId: dashboard ? '1' : (searchParams.get('workstreamId') || activeWorkstream.toString()),
  };
  const [{ data }, execute] = useAxios(
    documentApi({ workstreamId: searchResultParams.workstreamId, documentId }),
    { manual: true },
  );
  const document = data?.data?.[0];

  useEffect(() => {
    if (documentId) {
      execute();
    }
  }, [documentId]);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement(
        {
          pageLanguage: i18n.language,
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
  }, []);

  if (!document) {
    return null;
  }

  const preparedGetAttachmentURL = (fileName, fileType = 'image') => getAttachmentURL({
    workstreamId: searchResultParams.workstreamId,
    id: documentId,
    fileName,
    fileType,
  });

  const trademarkViewsOptions = [
    {
      label: t('ipr.bibliographic'),
      value: 'BibliographicData',
    },
    {
      label: t('ipr.mark'),
      value: 'Mark',
    },
    {
      label: t('ipr.description'),
      value: 'Description',
    },
    {
      label: t('ipr.legalStatus'),
      value: 'LegalStatus',
    },
    {
      label: t('ipr.applicantDetails'),
      value: 'ApplicantsDetails',
    },
    {
      label: t('ipr.ownerDetails'),
      value: 'OwnersDetails',
    },
    {
      label: t('ipr.representativeDetails'),
      value: 'RepresentativesDetails',
    },
    {
      label: t('ipr.goodsServices'),
      value: 'GoodsAndServices',
    },
    {
      label: t('ipr.figurativeClassification'),
      value: 'FigurativeClassification',
    },
    {
      label: t('ipr.exhibitionDetails'),
      value: 'ExhibitionInformation',
    },
    {
      label: t('ipr.priorities'),
      value: 'Priorities',
    },
    {
      label: t('ipr.officeActions'),
      value: 'OfficeActions',
    },
    {
      label: t('ipr.originalDocument'),
      value: 'OriginalDocuments',
    },
  ];

  const patentViewsOptions = [
    {
      label: t('ipr.bibliographic'),
      value: 'BibliographicData',
    },
    {
      label: t('ipr.description'),
      value: 'Description',
    },
    {
      label: t('patent.claims'),
      value: 'Claims',
    },
    {
      label: t('patent.citations'),
      value: 'Citations',
    },
    {
      label: t('patent.drawings'),
      value: 'Drawings',
    },
    {
      label: t('ipr.legalStatus'),
      value: 'LegalStatus',
    },
    {
      label: t('ipr.applicantDetails'),
      value: 'ApplicantsDetails',
    },
    {
      label: t('inventors'),
      value: 'Inventors',
    },
    {
      label: t('ipr.ownerDetails'),
      value: 'OwnersDetails',
    },
    {
      label: t('ipr.representativeDetails'),
      value: 'Representative',
    },
    {
      label: t('ipr.officeActions'),
      value: 'OfficeActions',
    },
    {
      label: t('patent.patentFamility.patentFamility'),
      value: 'PatentFamility',
    },
    {
      label: t('ipr.priorities'),
      value: 'PrioritiesDetails',
    },
    {
      label: t('ipr.originalDocument'),
      value: 'OriginalDocuments',
    },
  ];

  const onChangeSelect = (i) => {
    setSelectedView(i);
  };

  const trademarkViews = () => {
    const content = {
      BibliographicData: (
        <TrademarkBibliographic
          isIPRExpanded={isIPRExpanded}
          BibliographicData={document.BibliographicData}
          getAttachmentURL={preparedGetAttachmentURL}
        />
      ),
      LegalStatus: (
        <LegalStatus>
          {document?.LegalStatus?.map((row) => (
            <LegalStatusRow row={row} />
          ))}
        </LegalStatus>
      ),
      ApplicantsDetails: (
        <Applicants>
          {document.ApplicantsDetails.map((row) => (
            <ApplicantRow row={row} />
          ))}
        </Applicants>
      ),
      OwnersDetails: (
        <Owners>
          {document.OwnersDetails.map((row) => (
            <OwnerRow row={row} />
          ))}
        </Owners>
      ),
      RepresentativesDetails: (
        <Representatives>
          {document.RepresentativesDetails.map((row) => (
            <RepresentativeRow row={row} />
          ))}
        </Representatives>
      ),
      OfficeActions: (
        <OfficeActions>
          {document.OfficeActions.map((row) => (
            <OfficeActionRow row={row} />
          ))}
        </OfficeActions>
      ),
      GoodsAndServices: (
        <GoodsAndServices>
          {document.GoodsAndServices.map((row) => (
            <GoodsAndServicesRow row={row} />
          ))}
        </GoodsAndServices>
      ),
      FigurativeClassification: (
        <FigurativeClassification>
          {document.FigurativeClassification.map((row) => (
            <FigurativeClassificationRow row={row} />
          ))}
        </FigurativeClassification>
      ),
      ExhibitionInformation: (
        <Exhibitions>
          {document.ExhibitionInformation.map((row) => (
            <ExhibitionRow row={row} />
          ))}
        </Exhibitions>
      ),
      Priorities: (
        <Priorities>
          {document.Priorities.map((row) => (
            <PriorityRow row={row} />
          ))}
        </Priorities>
      ),
      Description: (
        <Description description={document.BibliographicData.Description} />
      ),
      Mark: (
        <ImageWithZoom
          img={preparedGetAttachmentURL(document.BibliographicData.Mark)}
          className={style.imgWithZoom}
        />
      ),
      OriginalDocuments: (
        <OriginalDocument
          originalDocuments={document.OriginalDocuments}
          workstreamId={searchResultParams.workstreamId}
          documentId={documentId}
        />
      ),
    };

    return content;
  };

  const patentViews = () => {
    const content = {
      BibliographicData: (
        <BibliographicDataSection
          document={document}
          isIPRExpanded={isIPRExpanded}
        >
          <h6>{t('ipr.drawings')}</h6>
          {document?.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            />
          ) : (
            <NoData />
          )}
        </BibliographicDataSection>
      ),
      LegalStatus: (
        <div>
          {document?.LegalStatus?.length ? (
            <LegalStatus>
              {document?.LegalStatus.map((row) => (
                <LegalStatusRow row={row} />
              ))}
            </LegalStatus>
          ) : (
            <NoData />
          )}
        </div>
      ),
      ApplicantsDetails: (
        <div>
          {document?.ApplicantsDetails?.length ? (
            <Applicants>
              {document?.ApplicantsDetails.map((row) => (
                <ApplicantRow row={row} />
              ))}
            </Applicants>
          ) : (
            <NoData />
          )}
        </div>
      ),
      OwnersDetails: (
        <div>
          {document?.OwnersDetails?.length ? (
            <Owners>
              {document?.OwnersDetails.map((row) => (
                <OwnerRow row={row} />
              ))}
            </Owners>
          ) : (
            <NoData />
          )}
        </div>
      ),
      Representative: (
        <div>
          {document?.Representative?.length ? (
            <Representatives>
              {document?.Representative.map((row) => (
                <RepresentativeRow row={row} />
              ))}
            </Representatives>
          ) : (
            <NoData />
          )}
        </div>
      ),
      Citations: (
        <div>
          {document?.Citations?.length ? (
            <Citations>
              {document?.Citations.map((row) => (
                <CitationRow row={row} />
              ))}
            </Citations>
          ) : (
            <NoData />
          )}
        </div>
      ),
      Inventors: (
        <div>
          {document?.InventorsDetails?.length ? (
            <Inventors>
              {document?.InventorsDetails.map((row) => (
                <InventorRow row={row} />
              ))}
            </Inventors>
          ) : (
            <NoData />
          )}
        </div>
      ),
      OfficeActions: (
        <div>
          {document?.OfficeActions?.length ? (
            <OfficeActions>
              {document?.OfficeActions.map((row) => (
                <OfficeActionRow row={row} />
              ))}
            </OfficeActions>
          ) : (
            <NoData />
          )}
        </div>
      ),
      PatentFamility: (
        <div>
          {document?.PatentFamility?.length ? (
            <PatentFamility>
              {document?.PatentFamility.map((row) => (
                <PatentFamilityRow row={row} />
              ))}
            </PatentFamility>
          ) : (
            <NoData />
          )}
        </div>
      ),
      PrioritiesDetails: (
        <div>
          {document?.PrioritiesDetails?.length ? (
            <Priorities>
              {document?.PrioritiesDetails.map((row) => (
                <PriorityRow row={row} />
              ))}
            </Priorities>
          ) : (
            <NoData />
          )}
        </div>
      ),
      Description: (
        <PatentDescription
          description={document.Description}
          isIPRExpanded={isIPRExpanded}
        >
          <h6>{t('ipr.drawings')}</h6>
          {document.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            />
          ) : (
            <NoData />
          )}
        </PatentDescription>
      ),
      Claims: (
        <Claims
          claims={document?.Claims}
          isIPRExpanded={isIPRExpanded}
        >
          <h6>{t('ipr.drawings')}</h6>
          {document?.Drawings?.length ? (
            <Carousel
              largeThumb={isIPRExpanded}
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            />
          ) : (
            <NoData />
          )}
        </Claims>
      ),
      Drawings: (
        <div>
          {document.Drawings.length ? (
            <Carousel
              largeThumb
              className="drawings"
              images={document.Drawings.map((d) => preparedGetAttachmentURL(d.FileName))}
            />
          ) : (
            <NoData />
          )}
        </div>
      ),
      OriginalDocuments: (
        <OriginalDocument
          originalDocuments={document.OriginalDocuments}
          workstreamId={searchResultParams.workstreamId}
          documentId={documentId}
        />
      ),
    };
    return content;
  };

  const views = {
    1: patentViews,
    2: trademarkViews,
  };

  const renderSelectedView = () => {
    let content = <NoData />;
    if (searchResultParams.workstreamId === '2') {
      if (
        document[selectedView.value]
        || ((selectedView.value === 'Description'
        || selectedView.value === 'Mark')
        && document.BibliographicData[selectedView.value])
      ) {
        content = views[searchResultParams.workstreamId]()[selectedView.value];
      }
    } else if (searchResultParams.workstreamId === '1') {
      if (document[selectedView.value]) {
        content = views[searchResultParams.workstreamId]()[selectedView.value];
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
            <h5 className="mb-0">{document.BibliographicData.PublicationNumber}</h5>
          </div>
          <div>
            {
            !dashboard && (
              <>
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
                  className="p-0 pe-5 border-end me-4"
                  text={
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="md-text text-gray"
                    />
              }
                  disabled={!nextDocument}
                  onClick={() => setActiveDocument(nextDocument)}
                />
              </>)
              }
            {
                showActions
            && <IprControlAction
              collapseIPR={collapseIPR}
              isIPRExpanded={
                    isIPRExpanded
                      }
              onClose={onClose}
            />
}
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
                    checkOn={document.BibliographicData.Owners.join('; ')}
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
        {searchResultParams.workstreamId === '1' && (
          <p className="text-gray px-6">
            <HandleEmptyAttribute checkOn={document.BibliographicData.ApplicationTitle} />
          </p>
        )}
        <div className="border-top py-3 px-6 d-flex align-items-start">
          <Button
            variant="primary"
            text={(
              <>
                <FaSearch className="fs-base me-2" />
                {t('search:findSimilar')}
              </>
            )}
            className="me-4 fs-sm my-2 my-xl-0"
          />
          <Button
            variant="primary"
            text={(
              <>
                <FiDownload className="fs-base me-2" />
                {t('search:download')}
              </>
            )}
            className="me-4 fs-sm my-2 my-xl-0"
          />
          <div id="google_translate_element" className="d-inline-block" />
        </div>
      </div>
      {
      dashboard && showActions ? (
        <IprSections
          options={
                    searchResultParams.workstreamId === '2'
                      ? trademarkViewsOptions
                      : patentViewsOptions
                  }
          onChangeSelect={onChangeSelect}
          selectedView={selectedView}
          renderSelectedView={renderSelectedView}
          documentId={documentId}
          activeTab={activeTab}
          isCardInprogress={isCardInprogress}
          selectedCardId={selectedCardId}
          className="notes-editor-container"
        />
      ) : (
        <IprData
          options={searchResultParams.workstreamId === '2' ? trademarkViewsOptions : patentViewsOptions}
          onChangeSelect={onChangeSelect}
          selectedView={selectedView}
          renderSelectedView={renderSelectedView}
        />)
      }
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
  activeTab: 2,
};

export default IprDetails;
