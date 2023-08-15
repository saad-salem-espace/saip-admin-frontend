import { render } from 'TestUtils';
import sampleTrademark from 'testing-resources/trademarks/sampleTrademark.json';
import { waitFor } from '@testing-library/react';
import I18n from 'i18n';
import { getAttachmentURL } from 'utils/attachments';
import BibliographicDataSection from './BibliographicDataSection';

describe('<BibliographicDataSection />', () => {
  const tSearch = (key, options) => I18n.t(key, { ...options, ns: 'search' });
  const tDefault = (key, options) => I18n.t(key, { ...options });

  it('renders component successfully', async () => {
    const { getByText } = render(
      <BibliographicDataSection
        BibliographicData={sampleTrademark.BibliographicData}
        isIPRExpanded
        getAttachmentURL={getAttachmentURL}
      />,
    );
    await waitFor(() => {
      ['register', 'trademarks.markNameEN', 'trademarks.markNameAR', 'ipr.filingNumber', 'ipr.filingDate', 'trademarks.markType',
        'trademarks.markStatus', 'ipr.registrationNumber', 'ipr.registrationDate', 'ipr.publicationNumber',
        'ipr.publicationDate', 'trademarks.markDescription'].forEach((attributeName) => {
        expect(getByText(tSearch(attributeName))).toBeInTheDocument();
      });
      expect(getByText(sampleTrademark.BibliographicData.BrandNameEn)).toBeInTheDocument();
      expect(getByText(sampleTrademark.BibliographicData.Owners.join('; '))).toBeInTheDocument();
      expect(getByText(sampleTrademark.BibliographicData.Applicants.join('; '))).toBeInTheDocument();
      expect(getByText(sampleTrademark.BibliographicData.Representatives.join('; '))).toBeInTheDocument();
    });
  });

  it('renders empty handler text if not exist', async () => {
    const { queryAllByText, getByText } = render(
      <BibliographicDataSection
        BibliographicData={sampleTrademark.BibliographicData}
        getAttachmentURL={getAttachmentURL}
      />,
    );
    if (sampleTrademark.BibliographicData.BrandNameAr) {
      expect(getByText(sampleTrademark.BibliographicData.BrandNameAr)).toBeInTheDocument();
    } else {
      expect(queryAllByText(tDefault('emptyText')).length).toBeGreaterThanOrEqual(1);
    }
  });
});
