import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import I18n from 'i18n';
import trademarkResponse from 'testing-resources/trademarks/sampleTrademark.json';
import { Formik } from 'formik';
import TrademarksSearchResultCard from './TrademarksSearchResultCard';

describe('<SearchResultCard />', () => {
  const t = (key, options) => I18n.t(key, { ...options, ns: 'search' });
  const query = 'Manufcature';

  it('renders detailed component correctly', async () => {
    const selectedView = { label: t('detailed'), value: 'detailed' };

    const { getByText } = render(
      <Formik>
        <TrademarksSearchResultCard
          searchResult={trademarkResponse}
          query={query}
          selectedView={selectedView}
        />
      </Formik>,
    );
    await waitFor(() => {
      expect(getByText(trademarkResponse.BibliographicData.BrandNameEn)).toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.BrandNameAr)).toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.TrademarkLastStatus))
        .toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.Applicants.join('; ')))
        .toBeInTheDocument();
      expect(getByText(t('filed', { value: trademarkResponse.BibliographicData.FilingNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(
        trademarkResponse.BibliographicData.FilingDate,
      )).toBeInTheDocument();
      expect(getByText(t('ipr.published', { value: trademarkResponse.BibliographicData.PublicationNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.PublicationDate)).toBeInTheDocument();
      expect(getByText(t('ipr.registered', { value: trademarkResponse.BibliographicData.RegistrationNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(
        trademarkResponse.BibliographicData.RegistrationDate,
      )).toBeInTheDocument();
    });
  });

  it('renders summary component correctly', async () => {
    const selectedView = { label: t('trademarks.summary'), value: 'summary' };

    const { getByText } = render(
      <Formik>
        <TrademarksSearchResultCard
          searchResult={trademarkResponse}
          query={query}
          selectedView={selectedView}
        />
      </Formik>,
    );
    await waitFor(() => {
      expect(getByText(trademarkResponse.BibliographicData.BrandNameEn)).toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.BrandNameAr)).toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.TrademarkLastStatus))
        .toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.Applicants.join('; ')))
        .toBeInTheDocument();
      expect(getByText(t('filed', { value: trademarkResponse.BibliographicData.FilingNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(
        trademarkResponse.BibliographicData.FilingDate,
      )).toBeInTheDocument();
    });
  });

  it('renders compact component correctly', async () => {
    const selectedView = { label: t('trademarks.compact'), value: 'compact' };

    const { getByText } = render(
      <Formik>
        <TrademarksSearchResultCard
          searchResult={trademarkResponse}
          query={query}
          selectedView={selectedView}
        />
      </Formik>,
    );
    await waitFor(() => {
      // expect(getByText(trademarkResponse.BibliographicData.BrandNameEn)).toBeInTheDocument();
      // expect(getByText(trademarkResponse.BibliographicData.BrandNameAr)).toBeInTheDocument();
      expect(getByText(trademarkResponse.BibliographicData.TrademarkLastStatus))
        .toBeInTheDocument();
      expect(getByText(t('filed', { value: trademarkResponse.BibliographicData.FilingNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(
        trademarkResponse.BibliographicData.FilingDate,
      )).toBeInTheDocument();
    });
  });
});
