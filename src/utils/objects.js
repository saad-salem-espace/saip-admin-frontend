/* eslint-disable no-param-reassign */
import { get } from 'wild-wild-path';

function getProperties(obj, propertyNames) {
  return Object.entries(propertyNames).reduce((acc, [propertyName, propertyPath]) => {
    const value = get(obj, propertyPath);
    if (Array.isArray(value)) {
      acc[propertyName] = value.join(' ');
    } else {
      acc[propertyName] = value;
    }
    return acc;
  }, {});
}

function sortWorkstreams(workstreams) {
  if (!workstreams) return workstreams;

  const copyright = workstreams.find(({ workstreamName }) => workstreamName === 'copyright');
  const icLayout = workstreams.find(({ workstreamName }) => workstreamName === 'IC Layout');
  const decision = workstreams.find(({ workstreamName }) => workstreamName === 'Decision');
  const plants = workstreams.find(({ workstreamName }) => workstreamName === 'Plant Varieties');
  workstreams[3] = copyright;
  workstreams[4] = icLayout;
  workstreams[5] = plants;
  workstreams[6] = decision;

  return workstreams;
}

// eslint-disable-next-line import/prefer-default-export
export { getProperties, sortWorkstreams };
