import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import './bibliographic.scss';
import ShowMore from 'components/shared/show-more/ShowMore';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LabelValue from 'components/ipr-details/shared/label-value/LabelValue';

const BibliographicDataSection = (
  {
    isIPRExpanded,
    BibliographicData,
    children,
    hideSearchQueryMenu, showSearchQuery,
    ShowSearchQueryMenu, toggleIcon, upArrow,
  },
) => {
  const { t } = useTranslation('search');
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
  return (
    <Container fluid>
      <Row>
        <Col md={getGrid('bibliographic')}>
          <h6 className="mb-4">
            {t('register')}
          </h6>
          <LabelValue
            label={t('industrialDesign.designTitleEn')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.DesignTitleEN}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('industrialDesign.designTitleAr')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.DesignTitleAR}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.filingNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.FilingNumber}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.filingDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.FilingDate}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('industrialDesign.designStatus')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Status}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.registrationNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.RegistrationNumber}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.registrationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.RegistrationDate}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.publicationNumber')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PublicationNumber}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.publicationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PublicationDate}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <p className="text-primary f-14">{t('abstract')}</p>
          <LabelValue
            labelClassName="bibliographicLabel"
            value={
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData.DesignAbstract} />
              </ShowMore>
            }
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('industrialDesign.designers')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Designers.join('; ')}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.applicants')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Applicants.join('; ')}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('ipr.representatives')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Representatives.join('; ')}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('classifications')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.LocarnoClassification.join('; ')}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
        </Col>
        <Col md={getGrid('drawings')} className={isIPRExpanded ? 'border-start' : ''}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

BibliographicDataSection.propTypes = {
  BibliographicData: PropTypes.shape({
    DesignTitleEN: PropTypes.string,
    DesignTitleAR: PropTypes.string,
    Mark: PropTypes.string,
    FilingNumber: PropTypes.string,
    FilingDate: PropTypes.string,
    Status: PropTypes.string,
    RegistrationNumber: PropTypes.string,
    RegistrationDate: PropTypes.string,
    DesignAbstract: PropTypes.string,
    PublicationNumber: PropTypes.string,
    PublicationDate: PropTypes.string,
    Designers: PropTypes.arrayOf(PropTypes.string),
    Representatives: PropTypes.arrayOf(PropTypes.string),
    Applicants: PropTypes.arrayOf(PropTypes.string),
    LocarnoClassification: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isIPRExpanded: PropTypes.string.isRequired,
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
