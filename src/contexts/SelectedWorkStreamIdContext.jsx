import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const SelectedWorkStreamIdContext = createContext();
export default SelectedWorkStreamIdContext;

const SelectedWorkStreamIdProvider = ({ children }) => {
  const [workStreamId, setWorkStreamId] = useState(1);

  const workStreamValue = useMemo(() => ({
    workStreamId,
    setWorkStreamId,
  }), [workStreamId]);

  return (
    <SelectedWorkStreamIdContext.Provider value={workStreamValue}>
      {children}
    </SelectedWorkStreamIdContext.Provider>
  );
};

SelectedWorkStreamIdProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SelectedWorkStreamIdProvider };
