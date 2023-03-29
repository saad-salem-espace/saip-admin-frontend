/* eslint-disable react/jsx-indent */
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import {
  faTimes, faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter, faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import Col from 'react-bootstrap/Col';
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
import style from './ipr-details.module.scss';
import BibliographicDataSection from './BibliographicDataSection';
import c from '../../assets/images/search-header-bg.svg';
// import Citation from './citation/Citation';
// import CitationRow from './citation/CitationRow';
import TrademarkBibliographic from './trademarks/bibliographic-data-section/BibliographicDataSection';
import LegalStatus from './shared/legal-status/LegalStatus';
import LegalStatusRow from './shared/legal-status/LegalStatusRow';
import Applicants from './shared/applicants/Applicants';
import ApplicantRow from './shared/applicants/ApplicantRow';
import Owners from './shared/owners/Owners';
import OwnerRow from './shared/owners/OwnerRow';
import Representatives from './shared/representatives/Representatives';
import RepresentativeRow from './shared/representatives/RepresentativeRow';
import OfficeActions from './trademarks/office-actions/OfficeActions';
import OfficeActionRow from './trademarks/office-actions/OfficeActionRow';
import GoodsAndServices from './trademarks/goods-and-services/GoodsAndServices';
import GoodsAndServicesRow from './trademarks/goods-and-services/GoodsAndServicesRow';
import FigurativeClassification from './trademarks/figurative-classification/FigurativeClassification';
import FigurativeClassificationRow from './trademarks/figurative-classification/FigurativeClassificationRow';
import Exhibitions from './trademarks/exhibitions/Exhibitions';
import ExhibitionRow from './trademarks/exhibitions/ExhibitionRow';
import Priorities from './trademarks/priorities/Priorities';
import PriorityRow from './trademarks/priorities/PriorityRow';
import Description from './shared/description/Description';
import trademarkSample from '../../testing-resources/trademarks/sampleTrademark.json';

// TODO change structure when trademarks are added
function IprDetails({
  collapseIPR, isIPRExpanded, documentId, onClose, moreDetails,
}) {
  const { t } = useTranslation('search');
  const [searchParams] = useSearchParams();
  const [document, setDocument] = useState(null);
  const [selectedView, setSelectedView] = useState({ label: t('ipr.bibliographic'), value: 'bibliographic' });

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
      value: 'bibliographic',
    },
    {
      label: t('ipr.mark'),
      value: 'mark',
    },
    {
      label: t('ipr.description'),
      value: 'description',
    },
    {
      label: t('ipr.legalStatus'),
      value: 'legalStatus',
    },
    {
      label: t('ipr.applicantDetails'),
      value: 'applicants',
    },
    {
      label: t('ipr.ownerDetails'),
      value: 'owners',
    },
    {
      label: t('ipr.representativeDetails'),
      value: 'representatives',
    },
    {
      label: t('ipr.goodsServices'),
      value: 'goodsServices',
    },
    {
      label: t('ipr.figurativeClassification'),
      value: 'figurative',
    },
    {
      label: t('ipr.exhibitionDetails'),
      value: 'exhibition',
    },
    {
      label: t('ipr.priorities'),
      value: 'priorities',
    },
    {
      label: t('ipr.officeActions'),
      value: 'officeActions',
    },
  ];

  // todo in patent story
  const patentViewsOptions = [
    {
      label: t('ipr.bibliographic'),
      value: 'bibliographic',
    },
  ];

  const onChangeSelect = (i) => {
    setSelectedView(i);
  };

  const trademarkViews = {
    bibliographic: <TrademarkBibliographic document={document} />,
    legalStatus: <LegalStatus>
      {
        trademarkSample.LegalStatus.map((row) => (
          <LegalStatusRow row={row} />
        ))
      }
                 </LegalStatus>,
    applicants: <Applicants>
      {
        trademarkSample.ApplicantsDetails.map((row) => (
          <ApplicantRow row={row} />
        ))
      }
                </Applicants>,
    owners: <Owners>
      {
        trademarkSample.OwnersDetails.map((row) => (
          <OwnerRow row={row} />
        ))
      }
            </Owners>,
    representatives: <Representatives>
      {
        trademarkSample.Representative.map((row) => (
          <RepresentativeRow row={row} />
        ))
      }
                     </Representatives>,
    officeActions: <OfficeActions>
      {
        trademarkSample.OfficeActions.map((row) => (
          <OfficeActionRow row={row} />
        ))
      }
                   </OfficeActions>,
    goodsServices: <GoodsAndServices>
      {
        trademarkSample.GoodsAndServices.map((row) => (
          <GoodsAndServicesRow row={row} />
        ))
      }
                   </GoodsAndServices>,
    figurative: <FigurativeClassification>
      {
        trademarkSample.FigurativeClassification.map((row) => (
          <FigurativeClassificationRow row={row} />
        ))
      }
                </FigurativeClassification>,
    exhibition: <Exhibitions>
      {
        trademarkSample.ExhibitionInformation.map((row) => (
          <ExhibitionRow row={row} />
        ))
      }
                </Exhibitions>,
    priorities: <Priorities>
                  {
                    trademarkSample.Priorities.map((row) => (
                      <PriorityRow row={row} />
                    ))
                  }
                </Priorities>,
    description: <Description description={trademarkSample.description} />,

  };

  const patentViews = {
    bibliographic: <BibliographicDataSection document={document} />,
  };

  const views = {
    2: patentViews,
    1: trademarkViews,
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
            />
            <Button
              variant="link"
              className="p-0 pe-5 border-end me-4"
              text={<FontAwesomeIcon icon={faChevronRight} className="md-text text-gray" />}
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
          moreDetails && (
            <div className="ms-6 d-flex align-items-center mb-2">
              <Badge text="ended" varient="secondary" className="text-capitalize me-2" />
              <h5 className="text-capitalize text-primary font-regular mb-0">title</h5>
            </div>
          )
        }
        <p className="text-gray px-6">
          <HandleEmptyAttribute checkOn={document.BibliographicData.owner} />
        </p>
        {
          moreDetails && (
            <div className={`ms-6 mb-4 ${style.img}`}>
              <Image src={c} />
            </div>
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
                  options={searchResultParams.workstreamId === '1' ? trademarkViewsOptions : patentViewsOptions}
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
        {(views[searchResultParams.workstreamId])[selectedView.value]}
      </div>
    </div>
  );
}

IprDetails.propTypes = {
  collapseIPR: PropTypes.func.isRequired,
  isIPRExpanded: PropTypes.bool.isRequired,
  documentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func,
  moreDetails: PropTypes.bool,
};

IprDetails.defaultProps = {
  documentId: null,
  onClose: () => { },
  moreDetails: false,
};

export default IprDetails;
