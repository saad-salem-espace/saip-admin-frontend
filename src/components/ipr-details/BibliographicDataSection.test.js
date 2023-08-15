import { render } from 'TestUtils';
import samplePatent from 'testing-resources/patents/samplePatent.json';
import { waitFor } from '@testing-library/react';
import I18n from 'i18n';
import BibliographicDataSection from './BibliographicDataSection';

describe('<BibliographicDataSection />', () => {
  const tSearch = (key, options) => I18n.t(key, { ...options, ns: 'search' });

  it('renders component successfully', async () => {
    const { queryAllByText, getByText } = render(
      <BibliographicDataSection document={samplePatent} />,
    );
    await waitFor(() => {
      ['register', 'applicants', 'inventors', 'classifications', 'ipc', 'cpc', 'application'].forEach((attributeName) => {
        expect(getByText(tSearch(attributeName))).toBeInTheDocument();
      });

      if (samplePatent.Applicants.join('; ') === samplePatent.Inventors.join('; ')) {
        expect(queryAllByText(samplePatent.Applicants.join('; '))).toHaveLength(2);
      } else {
        expect(getByText(samplePatent.Applicants.join('; '))).toBeInTheDocument();
        expect(getByText(samplePatent.Inventors.join('; '))).toBeInTheDocument();
      }
      expect(getByText(samplePatent.IPCClassification.IPC.join('; '))).toBeInTheDocument();
      expect(getByText(samplePatent.CPCClassification.CPC.join('; '))).toBeInTheDocument();
      expect(getByText(`${samplePatent.BibliographicData.PublicationNumber} ${samplePatent.BibliographicData.PublicationDate}`)).toBeInTheDocument();
    });
  });
});
