import { waitFor } from '@testing-library/react';
import { render } from 'TestUtils';
import I18n from 'i18n';
import industrialDesignResponse from 'testing-resources/industrial-design/sampleIndustrialDesign.json';
import { Formik } from 'formik';
import IndustrialDesignResultCard from './IndustrialDesignResultCards';

describe('<IndustrialDesignResultCard />', () => {
  const t = (key, options) => I18n.t(key, { ...options, ns: 'search' });
  const query = 'Coffee';

  it('renders  component correctly', async () => {
    const { getByText } = render(
      <Formik>
        <IndustrialDesignResultCard
          searchResult={industrialDesignResponse}
          query={query}
        />
      </Formik>,
    );
    await waitFor(() => {
      expect(getByText(industrialDesignResponse.BibliographicData.DesignTitleEN))
        .toBeInTheDocument();
      expect(getByText(industrialDesignResponse.BibliographicData.DesignTitleAR))
        .toBeInTheDocument();
      expect(getByText(industrialDesignResponse.BibliographicData.Status))
        .toBeInTheDocument();
      expect(getByText(industrialDesignResponse.BibliographicData.Designers.join('; ')))
        .toBeInTheDocument();
      expect(getByText(t('filed', { value: industrialDesignResponse.BibliographicData.FilingNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(
        industrialDesignResponse.BibliographicData.FilingDate,
      )).toBeInTheDocument();
      expect(getByText(t('ipr.published', { value: industrialDesignResponse.BibliographicData.PublicationNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(industrialDesignResponse.BibliographicData.PublicationDate))
        .toBeInTheDocument();
      expect(getByText(t('ipr.registered', { value: industrialDesignResponse.BibliographicData.RegistrationNumber }), { exact: false })).toBeInTheDocument();
      expect(getByText(
        industrialDesignResponse.BibliographicData.RegistrationDate,
      )).toBeInTheDocument();
    });
  });
});
