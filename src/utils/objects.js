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
  const sortedWorkstreams = workstreams;
  const copyright = workstreams.find(({ workstreamName }) => workstreamName === 'copyright');
  const icLayout = workstreams.find(({ workstreamName }) => workstreamName === 'IC Layout');
  const decision = workstreams.find(({ workstreamName }) => workstreamName === 'Decision');
  const plants = workstreams.find(({ workstreamName }) => workstreamName === 'Plant Varieties');
  sortedWorkstreams[3] = copyright;
  sortedWorkstreams[4] = icLayout;
  sortedWorkstreams[5] = plants;
  sortedWorkstreams[6] = decision;

  return sortedWorkstreams;
}

// eslint-disable-next-line import/prefer-default-export
export { getProperties, sortWorkstreams };
