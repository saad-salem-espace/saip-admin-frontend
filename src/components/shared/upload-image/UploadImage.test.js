import { render } from 'TestUtils';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadImage from './UploadImage';
import fileGenerator from '../../../utils/fileGenerator';

const mockOnChange = jest.fn();

describe('<UploadImage />', () => {
  it('renders correctly', async () => {
    const { getByText } = render(<UploadImage
      changeIsImgUploaded={mockOnChange}
      showUploadImgSection
      uploadFile={mockOnChange}
      isSubmitting={false}
    />);

    await waitFor(() => {
      expect(getByText('Drag & Drop Files Here')).toBeInTheDocument();
    });
  });

  it('render spinner', async () => {
    const { getByRole } = render(<UploadImage
      changeIsImgUploaded={mockOnChange}
      showUploadImgSection
      uploadFile={mockOnChange}
      isSubmitting
    />);

    await waitFor(() => {
      expect(getByRole('status')).toBeInTheDocument();
    });
  });

  it('should display not allow files to be anything except image in formats png, gif, jpeg, tiff and jpg', async () => {
    const { container, queryAllByText } = render(<UploadImage
      changeIsImgUploaded={mockOnChange}
      showUploadImgSection
      uploadFile={mockOnChange}
      isSubmitting
    />);
    const validImage = fileGenerator({ size: 500, type: 'zip', name: 'test.zip' });
    await userEvent.upload(container.firstChild, validImage);
    await waitFor(() => expect(queryAllByText("Can't upload. Use an image in one of these formats: .jpeg, .png, .tiff, .jpg, or .gif")).toHaveLength(1));
  });

  it('should display allow images', async () => {
    const { container, queryAllByText } = render(<UploadImage
      changeIsImgUploaded={mockOnChange}
      showUploadImgSection
      uploadFile={mockOnChange}
      isSubmitting
    />);
    const validImage = fileGenerator({ size: 500, type: 'image/jpg', name: 'test.jpg' });
    await userEvent.upload(container.firstChild, [validImage]);
    await waitFor(() => expect(queryAllByText("Can't upload. Use an image in one of these formats: .jpeg, .png, .tiff, .jpg, or .gif")).toHaveLength(0));
  });

  it('not render', async () => {
    const { container } = render(<UploadImage
      changeIsImgUploaded={mockOnChange}
      showUploadImgSection={false}
      uploadFile={mockOnChange}
      isSubmitting={false}
    />);

    await waitFor(() => {
      expect(container.firstChild).toBeEmptyDOMElement();
    });
  });
});
