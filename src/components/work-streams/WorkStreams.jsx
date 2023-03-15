import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect } from 'react';
import CacheContext from 'contexts/CacheContext';
import PropTypes from 'prop-types';
import useCacheRequest from '../../hooks/useCacheRequest';
import style from './style.module.scss';

function WorkStreams({ selectedWorkStream, onChange }) {
  const { cachedRequests } = useContext(CacheContext);
  const [workstream] = useCacheRequest(cachedRequests.workstreamList, { url: 'workstreams' });
  const workstreams = workstream?.data;
  const handleChange = (workstreamId) => {
    onChange(workstreamId);
  };

  useEffect(() => {
    handleChange(workstreams?.[0].id);
  }, [workstreams]);
  if (!workstreams) return null;
  return (
    <div className="text-center">
      {
        workstreams.map((workStream) => (
          <Button
            variant="transparent"
            className={`${style.card} me-4 mb-lg-0 mb-3 shadow px-6 py-2 ${style[workStream.workstreamName]} ${selectedWorkStream === workStream.id ? style.active : ''}`}
            onClick={() => handleChange(workStream.id)}
            key={workStream.id}
          >
            <span className={`f-24 mb-2 d-block ${style.icon} icon-${workStream.workstreamName}`} />
            <span className="text-capitalize">{workStream.workstreamName}</span>
          </Button>
        ))
      }
    </div>
  );
}

WorkStreams.propTypes = {
  selectedWorkStream: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

WorkStreams.defaultProps = {
  selectedWorkStream: null,
};

export default WorkStreams;
