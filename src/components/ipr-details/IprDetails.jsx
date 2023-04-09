import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import {
  faTimes, faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'components/shared/badge/Badge';
import Image from 'react-bootstrap/Image';
import Button from 'components/shared/button/Button';
import Select from 'components/shared/form/select/Select';
import formStyle from 'components/shared/form/form.module.scss';
import { documentApi } from 'apis/search/documentsApi';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
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

function IprDetails({
  collapseIPR,
  isIPRExpanded,
  documentId,
  onClose,
  getNextDocument,
  getPreviousDocument,
  setActiveDocument,
}) {
  const { t } = useTranslation('search');
  const previousDocument = getPreviousDocument();
  const nextDocument = getNextDocument();
  const [searchParams] = useSearchParams();
  const [document, setDocument] = useState(null);
  const [selectedView, setSelectedView] = useState({ label: t('ipr.bibliographic'), value: 'BibliographicData' });

  const searchResultParams = {
    workstreamId: searchParams.get('workstreamId'),
  };
  useEffect(() => {
    if (documentId) {
      documentApi({ workstreamId: searchResultParams.workstreamId, documentId })
        .then((resp) => {
          setDocument(resp.data?.data[0]);
        });
    }
  }, [documentId]);

  if (!document) {
    return null;
  }

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
      value: 'Representative',
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
      value: 'Priorities',
    },
  ];

  const onChangeSelect = (i) => {
    setSelectedView(i);
  };

  const trademarkViews = () => {
    const content = {
      BibliographicData: <TrademarkBibliographic
        isIPRExpanded={isIPRExpanded}
        BibliographicData={document.BibliographicData}
      />,
      LegalStatus:
  <LegalStatus>
    {
            document.LegalStatus.map((row) => (
              <LegalStatusRow row={row} />
            ))
          }
  </LegalStatus>,
      ApplicantsDetails:
  <Applicants>
    {
            document.ApplicantsDetails.map((row) => (
              <ApplicantRow row={row} />
            ))
          }
  </Applicants>,
      OwnersDetails:
  <Owners>
    {
            document.OwnersDetails.map((row) => (
              <OwnerRow row={row} />
            ))
          }
  </Owners>,
      Representative:
  <Representatives>
    {
            document.Representative.map((row) => (
              <RepresentativeRow row={row} />
            ))
          }
  </Representatives>,
      OfficeActions:
  <OfficeActions>
    {
            document.OfficeActions.map((row) => (
              <OfficeActionRow row={row} />
            ))
          }
  </OfficeActions>,
      GoodsAndServices:
  <GoodsAndServices>
    {
            document.GoodsAndServices.map((row) => (
              <GoodsAndServicesRow row={row} />
            ))
          }
  </GoodsAndServices>,
      FigurativeClassification:
  <FigurativeClassification>
    {
            document.FigurativeClassification.map((row) => (
              <FigurativeClassificationRow row={row} />
            ))
          }
  </FigurativeClassification>,
      ExhibitionInformation:
  <Exhibitions>
    {
            document.ExhibitionInformation.map((row) => (
              <ExhibitionRow row={row} />
            ))
          }
  </Exhibitions>,
      Priorities:
  <Priorities>
    {
            document.Priorities.map((row) => (
              <PriorityRow row={row} />
            ))
          }
  </Priorities>,
      Description: <Description description={document.BibliographicData.Description} />,
      Mark: <ImageWithZoom img={document.BibliographicData.Mark} className={style.imgWithZoom} />,
    };

    return content;
  };

  const patentViews = () => {
    const content = {
      BibliographicData:
  <BibliographicDataSection
    document={document}
    isIPRExpanded={isIPRExpanded}
  />,
      LegalStatus:
  <LegalStatus>
    {
            document.LegalStatus.map((row) => (
              <LegalStatusRow row={row} />
            ))
          }
  </LegalStatus>,
      ApplicantsDetails:
  <Applicants>
    {
            document.ApplicantsDetails.map((row) => (
              <ApplicantRow row={row} />
            ))
          }
  </Applicants>,
      OwnersDetails:
  <Owners>
    {
            document.OwnersDetails.map((row) => (
              <OwnerRow row={row} />
            ))
          }
  </Owners>,
      Representative:
  <Representatives>
    {
            document.Representative.map((row) => (
              <RepresentativeRow row={row} />
            ))
          }
  </Representatives>,
      Citations:
  <Citations>
    {
            document.Citations.map((row) => (
              <CitationRow row={row} />
            ))
          }
  </Citations>,
      Inventors:
  <Inventors>
    {
            document.InventorsDetails.map((row) => (
              <InventorRow row={row} />
            ))
          }
  </Inventors>,
      OfficeActions:
  <OfficeActions>
    {
            document.OfficeActions.map((row) => (
              <OfficeActionRow row={row} />
            ))
          }
  </OfficeActions>,
      PatentFamility:
  <PatentFamility>
    {
            document.PatentFamility.map((row) => (
              <PatentFamilityRow row={row} />
            ))
          }
  </PatentFamility>,
      Priorities:
  <Priorities>
    {
            document.PrioritiesDetails.map((row) => (
              <PriorityRow row={row} />
            ))
          }
  </Priorities>,
      Description:
  <PatentDescription description={document.Description} isIPRExpanded={isIPRExpanded} className="px-0">
    <h6>{t('ipr.drawings')}</h6>
    {
            (document.Drawings).length ? (
              <Carousel largeThumb={isIPRExpanded} className="drawings" images={document.Drawings} />
            ) : (
              <NoData />
            )
          }
  </PatentDescription>,
      Claims:
  <Claims claims={document.Claims} isIPRExpanded={isIPRExpanded} className="px-0">
    <h6>{t('ipr.drawings')}</h6>
    {
            (document.Drawings).length ? (
              <Carousel largeThumb={isIPRExpanded} className="drawings" images={document.Drawings} />
            ) : (
              <NoData />
            )
          }
  </Claims>,
      Drawings: <Carousel largeThumb className="drawings" images={document.Drawings} />,
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
      if ((document[selectedView.value]) || ((selectedView.value === 'Description' || selectedView.value === 'Mark') && (document.BibliographicData[selectedView.value]))) {
        content = (views[searchResultParams.workstreamId]())[selectedView.value];
      }
    } else if (searchResultParams.workstreamId === '1') {
      if (document[selectedView.value]) {
        content = (views[searchResultParams.workstreamId]())[selectedView.value];
      }
    }
    return content;
  };
  return (
    <div className={`${style.iprWrapper}`}>
      <div className="border-bottom bg-primary-01">
        <div className="d-flex justify-content-between mb-2 px-6 pt-5">
          <div className="d-flex">
            <FontAwesomeIcon icon={faBookmark} className="me-3 f-22 text-primary-dark" />
            <h5>
              {document.BibliographicData.PublicationNumber}
            </h5>
          </div>
          <div>
            <Button
              variant="link"
              className="p-0 pe-5"
              text={<FontAwesomeIcon icon={faChevronLeft} className="md-text text-gray" />}
              disabled={!previousDocument}
              onClick={() => setActiveDocument(previousDocument)}
            />
            <Button
              variant="link"
              className="p-0 pe-5 border-end me-4"
              text={<FontAwesomeIcon icon={faChevronRight} className="md-text text-gray" />}
              disabled={!nextDocument}
              onClick={() => setActiveDocument(nextDocument)}
            />
            <Button
              variant="link"
              onClick={collapseIPR}
              className="p-0 pe-5 d-md-inline-block d-none"
              data-testid="expand-ipr-detail-button"
              text={<FontAwesomeIcon icon={isIPRExpanded ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} className={`f-17 text-gray ${style['expand-icon']}`} />}
            />
            <Button
              variant="link"
              data-testid="close-ipr-detail-button"
              onClick={onClose}
              className="p-0"
              text={<FontAwesomeIcon icon={faTimes} className="f-20 text-gray border-start ps-5" />}
            />
          </div>
        </div>
        {
          searchResultParams.workstreamId === '2' && (
            <div className="ms-6 mb-2">
              <Badge text={document.BibliographicData.TrademarkLastStatus} varient="secondary" className="text-capitalize me-2 mb-4" />
              <div className="d-flex justify-content-between">
                <div className="me-2 mb-md-0 mb-2">
                  <h5 className="text-capitalize text-primary-dark font-regular mb-2">
                    {document.BibliographicData.BrandNameEn}
                    <span className="d-block mt-2">
                      {document.BibliographicData.BrandNameAr}
                    </span>
                  </h5>
                  <p className="text-gray">
                    <HandleEmptyAttribute checkOn={document.BibliographicData.Owners.join('; ')} />
                  </p>
                </div>
                {
                  !isIPRExpanded && (
                    <div className={`me-6 mb-2 ${style.headerImg}`}>
                      <Image src={document.BibliographicData.Mark} />
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
        {
          searchResultParams.workstreamId === '1' && (
            <p className="text-gray px-6">
              <HandleEmptyAttribute checkOn={document.BibliographicData.owner} />
            </p>
          )
        }
      </div>
      <div className="px-6 pt-4">
        <Formik>
          {() => (
            <Form>
              <div className="position-relative">
                <span className={`position-absolute f-12 ${formStyle.label} ${formStyle.select2}`}>{t('viewSection')}</span>
                <Select
                  options={searchResultParams.workstreamId === '2' ? trademarkViewsOptions : patentViewsOptions}
                  setSelectedOption={onChangeSelect}
                  selectedOption={selectedView}
                  defaultValue={selectedView}
                  id="sections"
                  fieldName="sections"
                  className={`${style.select} mb-5 select-2`}
                />
              </div>
            </Form>
          )}
        </Formik>
        {renderSelectedView()}
      </div>
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
};

IprDetails.defaultProps = {
  documentId: null,
  onClose: () => { },
  getNextDocument: () => { },
  getPreviousDocument: () => { },
  setActiveDocument: () => { },
};

export default IprDetails;
