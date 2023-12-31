import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect } from 'react';
import CacheContext from 'contexts/CacheContext';
import PropTypes from 'prop-types';
import SelectedWorkStreamIdContext from 'contexts/SelectedWorkStreamIdContext';
import { sortWorkstreams } from 'utils/objects';
import useCacheRequest from '../../hooks/useCacheRequest';
import './workstream.scss';

function WorkStreams({ selectedWorkStream, onChange }) {
  const { t } = useTranslation('workstreams');
  const { setWorkStreamId } = useContext(SelectedWorkStreamIdContext);
  const { cachedRequests } = useContext(CacheContext);
  const [workstream] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });
  const workstreams = workstream?.data;
  const handleChange = (workstreamId) => {
    onChange(workstreamId);
    if (workstreamId) {
      setWorkStreamId(workstreamId);
    }
  };
  useEffect(() => {
    handleChange(workstreams?.[0].id);
  }, [workstreams]);
  if (!workstreams) return null;
  return (
    <div className="text-center">
      {
        sortWorkstreams(workstreams).map((workStream) => (
          <Button
            variant="transparent"
            className={`types me-4 mb-lg-0 mb-3 shadow px-6 py-2 ${workStream.workstreamName} ${selectedWorkStream === workStream.id ? 'active' : ''}`}
            onClick={() => handleChange(workStream.id)}
            key={workStream.id}
          >
            <span className={`fs-24 mb-2 d-block workstreamIcon icon-${workStream.workstreamName}`} />
            <span className="text-capitalize font-regular">{t(workStream.workstreamName.replace(/\s/g, ''))}</span>
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
