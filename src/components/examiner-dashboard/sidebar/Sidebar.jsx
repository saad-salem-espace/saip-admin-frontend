import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import logo from '../../../assets/images/logo-shape.png';
import './sidebar.scss';

function Sidebar() {
  const linksList = {
    IcPatent: 'Patent',
    IcTrademark: 'Trademark',
    IcCopyrights: 'Copyrights',
    IcIndustrialDesign: 'Industrial Design',
    IcPlantVarieties: 'Plant Varieties',
    IcIntegratedCircuits: 'Integrated Circuits',
  };
  return (
    <div className="dashboard-sidebar justify-content-center bg-white shadow position-fixed top-0 start-0  w-65 vh-100">
      <Link to="/" as={Link}>
        <Image src={logo} className="d-block my-5 mx-auto" />
      </Link>
      <Nav defaultActiveKey="/home" className="flex-column">
        {Object.entries(linksList).map((links) => (
          <OverlayTrigger
            key={links[0]}
            placement="right"
            overlay={
              <Tooltip id={`tooltip-${links[0]}`}>
                {links[1]}
              </Tooltip>
            }
          >
            <Nav.Link to="/" as={Link} className={`${links[0]}`}>
              {links[1]}
            </Nav.Link>
          </OverlayTrigger>
        ))}
      </Nav>
    </div>
  );
}

export default Sidebar;
