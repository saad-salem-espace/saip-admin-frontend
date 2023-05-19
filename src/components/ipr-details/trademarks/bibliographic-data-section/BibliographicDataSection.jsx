import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import HandleEmptyAttribute from 'components/shared/empty-states/HandleEmptyAttribute';
import './bibliographic.scss';
import ShowMore from 'components/shared/show-more/ShowMore';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LabelValue from 'components/ipr-details/shared/label-value/LabelValue';

const BibliographicDataSection = (
  {
    isIPRExpanded,
    BibliographicData,
    getAttachmentURL,
    hideSearchQueryMenu, showSearchQuery,
    ShowSearchQueryMenu, toggleIcon, upArrow,
  },
) => {
  const { t } = useTranslation('search');

  return (
    <Container fluid>
      <Row>
        {
        isIPRExpanded && (
          <Col md={4} className="mb-md-0 mb-2">
            <div className="me-4">
              <Image src={getAttachmentURL(BibliographicData.Mark)} className="mw-100" />
            </div>
          </Col>
        )
      }
        <Col md={isIPRExpanded ? 8 : 12}>
          <h6 className="mb-4">
            {t('register')}
          </h6>
          <LabelValue
            label={t('trademarks.markNameEN')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.BrandNameEn}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
          />
          <LabelValue
            label={t('trademarks.markNameAR')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.BrandNameAr}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
          />
          <LabelValue
            label={t('trademarks.filingNumber')}
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
            label={t('trademarks.filingDate')}
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
            label={t('trademarks.markType')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.TrademarkType}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('trademarks.markStatus')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.TrademarkLastStatus}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <LabelValue
            label={t('trademarks.registrationNumber')}
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
            label={t('trademarks.registrationDate')}
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
            label={t('trademarks.publicationNumber')}
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
            label={t('trademarks.publicationDate')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.PublicationDate}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
          <p className="text-primary f-14">{t('trademarks.markDescription')}</p>
          <LabelValue
            labelClassName="bibliographicLabel"
            value={
              <ShowMore>
                <HandleEmptyAttribute checkOn={BibliographicData.Description} />
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
            label={t('ipr.owners')}
            labelClassName="bibliographicLabel"
            value={BibliographicData.Owners.join('; ')}
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
            value={BibliographicData.NICEClassification.join('; ')}
            hideSearchQueryMenu={hideSearchQueryMenu}
            showSearchQuery={showSearchQuery}
            ShowSearchQueryMenu={ShowSearchQueryMenu}
            toggleIcon={toggleIcon}
            upArrow={upArrow}
            className="mb-4"
          />
        </Col>
      </Row>
    </Container>
  );
};

BibliographicDataSection.propTypes = {
  BibliographicData: PropTypes.shape({
    BrandNameEn: PropTypes.string,
    BrandNameAr: PropTypes.string,
    Mark: PropTypes.string,
    FilingNumber: PropTypes.string,
    FilingDate: PropTypes.string,
    TrademarkType: PropTypes.string,
    TrademarkLastStatus: PropTypes.string,
    RegistrationNumber: PropTypes.string,
    RegistrationDate: PropTypes.string,
    Description: PropTypes.string,
    PublicationNumber: PropTypes.string,
    PublicationDate: PropTypes.string,
    Owners: PropTypes.arrayOf(PropTypes.string),
    Representatives: PropTypes.arrayOf(PropTypes.string),
    Applicants: PropTypes.arrayOf(PropTypes.string),
    NICEClassification: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isIPRExpanded: PropTypes.string.isRequired,
  getAttachmentURL: PropTypes.func.isRequired,
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
