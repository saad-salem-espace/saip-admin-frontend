import { useTranslation } from 'react-i18next';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import logo from '../../../assets/images/logo-shape.png';
import './sidebar.scss';

function Sidebar({ setActiveWorkstream, activeWorkstream }) {
  const { t } = useTranslation('dashboard');
  const linksList = [
    {
      id: 1,
      workStreamName: t('dashboard:workStream.patent'),
      WorkStreamClass: 'ic-patent',
    },
    {
      id: 2,
      workStreamName: t('dashboard:workStream.trademark'),
      WorkStreamClass: 'ic-trademark',
    },
    {
      id: 3,
      workStreamName: t('dashboard:workStream.copyrights'),
      WorkStreamClass: 'ic-copyrights',
    },
    {
      id: 4,
      workStreamName: t('dashboard:workStream.industrialDesign'),
      WorkStreamClass: 'ic-industrial-design',
    },
    {
      id: 5,
      workStreamName: t('dashboard:workStream.plantVarieties'),
      WorkStreamClass: 'ic-plant-varieties',
    },
    {
      id: 6,
      workStreamName: t('dashboard:workStream.integratedCircuits'),
      WorkStreamClass: 'ic-integrated-circuits',
    },
  ];
  return (
    <div className="dashboard-sidebar justify-content-center bg-white shadow position-fixed top-0 start-0  w-px-65 vh-100">
      <Link to="/" as={Link}>
        <Image src={logo} className="d-block my-5 mx-auto" />
      </Link>
      <div className="nav d-flex flex-column">
        {linksList.map((button) => (
          <AppTooltip
            placement="right"
            tooltipId={button.WorkStreamClass}
            tooltipContent={button.workStreamName}
            tooltipTrigger={
              <Button
                onClick={() => setActiveWorkstream(button.id)}
                variant="link"
                className={`nav-link ${button.id === activeWorkstream ? 'active' : ''} ${button.WorkStreamClass}`}
              >
                {button.workStreamName}
              </Button>
            }
          />
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  setActiveWorkstream: PropTypes.func.isRequired,
  activeWorkstream: PropTypes.number.isRequired,
};

export default Sidebar;
