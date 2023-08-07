const advancedSearchApi = ({
  workstreamId,
  qArr,
  imageName,
  docImage,
  enableSynonyms,
  page,
  sort,
  filters,
  qString,
}) => {
  const dataArr = [];
  qArr.forEach((qObj) => {
    if (qObj.identifier !== 'image') {
      dataArr.push(qObj);
    }
  });
  let imgName = imageName;
  let docImg = docImage || false;
  if (imgName && docImg) {
    imgName = `${docImg}/attachments/images/${imgName}`;
    docImg = true;
  }
  return {
    url: 'advanced-search',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    params: {
      workstreamId,
      sort: sort || 'mostRelevant',
      ...(imgName && { imageName: imgName }),
      ...(enableSynonyms && { enableSynonyms }),
      docImage: docImg,
      page: page || 1,
    },
    data: {
      qJson: dataArr,
      filters,
      qString,
    },
  };
};

export default advancedSearchApi;
