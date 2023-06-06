import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect } from 'react';
import CacheContext from 'contexts/CacheContext';
import PropTypes from 'prop-types';
import useCacheRequest from '../../hooks/useCacheRequest';
import './workstream.scss';

function WorkStreams({ selectedWorkStream, onChange, updateWorkStreamId }) {
  const { cachedRequests } = useContext(CacheContext);
  const [workstream] = useCacheRequest(cachedRequests.workstreams, { url: 'workstreams' });
  const workstreams = workstream?.data;
  const handleChange = (workstreamId) => {
    onChange(workstreamId);
    updateWorkStreamId(workstreamId);
  };
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
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
            className={`types me-4 mb-lg-0 mb-3 shadow px-6 py-2 ${workStream.workstreamName} ${selectedWorkStream === workStream.id ? 'active' : ''}`}
            onClick={() => handleChange(workStream.id)}
            key={workStream.id}
          >
            <span className={`f-24 mb-2 d-block workstreamIcon icon-${workStream.workstreamName}`} />
            <span className="text-capitalize font-regular">{currentLang === 'ar' ? workStream.workstreamNameAr : workStream.workstreamName}</span>
          </Button>
        ))
      }
    </div>
  );
}

WorkStreams.propTypes = {
  selectedWorkStream: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  updateWorkStreamId: PropTypes.func.isRequired,
};

WorkStreams.defaultProps = {
  selectedWorkStream: null,
};

export default WorkStreams;
