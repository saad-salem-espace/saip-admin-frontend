import { useTranslation } from 'react-i18next';
import AppTooltip from 'components/shared/app-tooltip/AppTooltip';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from '../../../assets/images/logo-shape.png';
import './sidebar.scss';

function Sidebar() {
  const { t } = useTranslation('dashboard');
  const linksList = [
    {
      id: 1,
      workStreamName: t('dashboard:workStream.patent'),
      WorkStreamClass: 'IcPatent',
    },
    {
      id: 2,
      workStreamName: t('dashboard:workStream.trademark'),
      WorkStreamClass: 'IcTrademark',
    },
    {
      id: 3,
      workStreamName: t('dashboard:workStream.copyrights'),
      WorkStreamClass: 'IcCopyrights',
    },
    {
      id: 4,
      workStreamName: t('dashboard:workStream.industrialDesign'),
      WorkStreamClass: 'IcIndustrialDesign',
    },
    {
      id: 5,
      workStreamName: t('dashboard:workStream.plantVarieties'),
      WorkStreamClass: 'IcPlantVarieties',
    },
    {
      id: 6,
      workStreamName: t('dashboard:workStream.integratedCircuits'),
      WorkStreamClass: 'IcIntegratedCircuits',
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
                onclick=""
                variant="link"
                className={`nav-link ${button.WorkStreamClass}`}
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

export default Sidebar;
