import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const HandleEmptyAttribute = ({
  checkOn, RenderedComponent, renderedProps, className, emptyComponent,
}) => {
  const { t } = useTranslation();
  if (RenderedComponent && checkOn) {
    return <RenderedComponent {...renderedProps} />;
  }
  return checkOn || <span className={` ${className ? '' : 'italicText text-gray'}`}>{emptyComponent ? t('noRelevantData') : t('emptyText')}</span>;
};

HandleEmptyAttribute.propTypes = {
  checkOn: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  RenderedComponent: PropTypes.func,
  renderedProps: PropTypes.instanceOf(Object),
  className: PropTypes.string,
  emptyComponent: PropTypes.bool,
};

HandleEmptyAttribute.defaultProps = {
  checkOn: '',
  RenderedComponent: null,
  renderedProps: {},
  className: '',
  emptyComponent: false,
};

export default HandleEmptyAttribute;
