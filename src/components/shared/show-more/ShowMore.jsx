import { useTranslation } from 'react-i18next';
import ShowMoreText from 'react-show-more-text';
import PropTypes from 'prop-types';

function ShowMore({ children }) {
  const { t } = useTranslation('translation');

  return (
    <ShowMoreText
      lines={3}
      more={t('showMore')}
      less={t('showLess')}
      expanded={false}
      truncatedEndingComponent="... "
    >
      {children}
    </ShowMoreText>
  );
}

ShowMore.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShowMore;
