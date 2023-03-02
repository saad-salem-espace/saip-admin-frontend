import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const HandleEmptyAttribute = ({ checkOn, RenderedComponent, renderedProps }) => {
  const { t } = useTranslation();
  if (RenderedComponent && checkOn) {
    return <RenderedComponent {...renderedProps} />;
  }
  return checkOn || <i className="text-gray">{t('emptyText')}</i>;
};

HandleEmptyAttribute.propTypes = {
  checkOn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  RenderedComponent: PropTypes.func,
  renderedProps: PropTypes.instanceOf(Object),
};

HandleEmptyAttribute.defaultProps = {
  checkOn: '',
  RenderedComponent: null,
  renderedProps: {},
};

export default HandleEmptyAttribute;
