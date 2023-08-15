import PropTypes from 'prop-types';
import routes from 'components/routes/routes.json';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './errors.scss';
import { useTranslation } from 'react-i18next';

const SharedErrorPage = ({ title, msg, img }) => {
  const { t } = useTranslation('translation');
  return (
    <div className="d-flex align-items-center justify-content-center errorsWrapper text-center" translate="no">
      <div>
        <Image src={img} className="errorImg mb-10" />
        <h3 className="text-gray-700 mb-4">{title}</h3>
        <p className="text-gray fs-sm mb-8">{msg}</p>
        <a
          href={routes.home}
          className="btn btn-primary appBtn btn-md"
        >
          <FontAwesomeIcon icon={faHouse} className="fs-20 me-3" />
          {t('homePage')}
        </a>
      </div>
    </div>
  );
};

SharedErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
  msg: PropTypes.node.isRequired,
  img: PropTypes.string.isRequired,
};

export default SharedErrorPage;
