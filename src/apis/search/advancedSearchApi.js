const advancedSearchApi = ({
  workstreamId, qArr, imageName, enableSynonyms, page, sort,
}) => {
  const dataArr = [];
  qArr.forEach((qObj) => {
    if (qObj.identifier !== 'image') {
      dataArr.push(qObj);
    }
  });
  return {
    url: 'advanced-search',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    params: {
      workstreamId,
      sort: sort || 'mostRelevant',
      ...(imageName && { imageName }),
      ...(enableSynonyms && { enableSynonyms }),
      page: page || 1,
    },
    data: dataArr,
  };
};

export default advancedSearchApi;
