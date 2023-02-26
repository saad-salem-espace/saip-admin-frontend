import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import style from './style.module.scss';
import { getWorkstreamList } from '../../api/workstreamApi';

function WorkStreams({ selectedWorkStream, onChange }) {
  const [workstreams, setWorkstreams] = useState([]);

  useEffect(async () => {
    await getWorkstreamList().then((res) => {
      setWorkstreams(res.data);
    });
  }, []);

  const handleChange = (workstreamId) => {
    onChange(workstreamId);
  };

  // const workStreams = [
  //   {
  //     id: 1,
  //     icon: 'patents',
  //     text: 'Patents',
  //   },
  //   {
  //     id: 2,
  //     icon: 'trademark',
  //     text: 'Trademark',
  //   },
  //   {
  //     id: 3,
  //     icon: 'copyrights',
  //     text: 'Copyright',
  //   },
  //   {
  //     id: 4,
  //     icon: 'industrial-design',
  //     text: 'Industrial designs',
  //   },
  //   {
  //     id: 5,
  //     icon: 'plant-varieties',
  //     text: 'Plant varieties',
  //   },
  //   {
  //     id: 6,
  //     icon: 'layout',
  //     text: 'IC Layout',
  //   },
  // ];

  return (
    <div className="text-center">
      {
        workstreams.map((workStream) => (
          <Button
            variant="link"
            className={`${style.card} me-4 mb-lg-0 mb-3 shadow ${selectedWorkStream === workStream.id ? style.active : ''}`}
            onClick={() => handleChange(workStream.id)}
            key={workStream.id}
          >
            <span className={`f-24 mb-2 d-block ${style.icon} icon-${workStream.icon}`} />
            <span>{workStream.workstreamName}</span>
          </Button>
        ))
      }
    </div>
  );
}

export default WorkStreams;
