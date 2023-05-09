import { useTranslation } from 'react-i18next';
import ShowMoreText from 'react-show-more-text';
import PropTypes from 'prop-types';

function ShowMore({ children, lines }) {
  const { t } = useTranslation('translation');

  return (
    <ShowMoreText
      lines={lines}
      more={t('showMore')}
      less={t('showLess')}
      expanded={false}
      truncatedEndingComponent="..."
      anchorClass="text-primary show-more-less-clickable"
    >
      <span>{children}</span>
    </ShowMoreText>
  );
}

ShowMore.propTypes = {
  children: PropTypes.node.isRequired,
  lines: PropTypes.number,
};

ShowMore.defaultProps = {
  lines: 3,
};
export default ShowMore;
