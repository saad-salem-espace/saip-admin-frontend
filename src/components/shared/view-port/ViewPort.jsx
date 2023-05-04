import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { BREAKPOINTS } from '../../../utils/constants';

/**
 *  The SCREEN_SIZES are defived from the following tables:
 *
 *  |  Bp  | Min  |  Max  |
 *  | ---- | ---- | ----- |
 *  |  XS  | 0    |  566  |
 *  |  SM  | 567  |  767  |
 *  |  MD  | 768  |  1023 |
 *  |  LG  | 1024 |  1199 |
 *  |  XL  | 1200 |  Inf  |
 *
 *  |  Bp   | MIN  |   MAX   |
 *  | ----- | ---- | ------- |
 *  |  XS   | 0    | SM - 1  |
 *  |  SM   | SM   | MD - 1  |
 *  |  MD   | MD   | LG - 1  |
 *  |  LG   | LG   | XL - 1  |
 *  |  XL   | XL   |   Inf   |
*/
const SCREEN_SIZES = {
  xs: `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  sm: `(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`,
  md: `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`,
  lg: `(min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`,
  xl: `(min-width: ${BREAKPOINTS.xl}px)`,
  // gtXs: greater than Xs, i.e SM, MD, LG, and XL.
  gtXs: `(min-width: ${BREAKPOINTS.sm}px)`,
  gtSm: `(min-width: ${BREAKPOINTS.md}px)`,
  gtMd: `(min-width: ${BREAKPOINTS.lg}px)`,
  gtLg: `(min-width: ${BREAKPOINTS.xl}px)`,
  // ltXs: less than SM, i.e XS.
  ltSm: `(max-width: ${BREAKPOINTS.sm - 1}px)`,
  ltMd: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  ltLg: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  ltXl: `(max-width: ${BREAKPOINTS.xl - 1}px)`,
  // gteXs: greater than or equal to XS, i.e XS, MD, LG, and XL.
  gteXs: `(min-width: ${BREAKPOINTS.xs}px)`,
  gteSm: `(min-width: ${BREAKPOINTS.sm}px)`,
  gteMd: `(min-width: ${BREAKPOINTS.md}px)`,
  gteLg: `(min-width: ${BREAKPOINTS.lg}px)`,
  // lteSm: less than or equal to XS, i.e XS, and SM.
  lteSm: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  lteMd: `(max-width: ${BREAKPOINTS.lg - 1}px)`,
  lteLg: `(max-width: ${BREAKPOINTS.xl - 1}px)`,
};

const ViewPort = ({ size, children, renderOnServer }) => {
  const mqlRef = useRef();
  const [matches, setMatches] = useState(renderOnServer);

  useEffect(() => {
    const handler = (e) => {
      setMatches(e.matches);
    };

    if (!mqlRef.current || mqlRef.media !== SCREEN_SIZES[size]) {
      mqlRef.current = window.matchMedia(SCREEN_SIZES[size]);
      mqlRef.current.addEventListener('change', handler);
      setMatches(mqlRef.current.matches);
    }

    return (() => {
      if (!mqlRef.current) return;
      mqlRef.current.addEventListener('change', handler);
    });
  }, [mqlRef, size]);

  if (matches) return children;

  return null;
};

ViewPort.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(Object.keys(SCREEN_SIZES)).isRequired,
  renderOnServer: PropTypes.bool,
};

ViewPort.defaultProps = {
  renderOnServer: false,
};
export default ViewPort;
