import axiosFn from './axiosFn';

function getWorkstreamList() {
  return axiosFn('GET', 'api/workstreams');
}

function getWorkstreamIdentifiers(id) {
  return axiosFn('GET', `api/workstream/${id}/identifiers`);
}

export { getWorkstreamList, getWorkstreamIdentifiers };
