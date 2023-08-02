const getAggrFiltersApi = ({
  workstreamId,
  query,
  strId,
  imageName,
  docImage,
  similarDocId,
  enableSynonyms,
}) => {
  let imgName = imageName;
  let docImg = docImage || false;
  if (imgName && docImg) {
    imgName = `${docImg}/attachments/images/${imgName}`;
    docImg = true;
  }
  return ({
    url: 'filter',
    method: 'POST',
    params: {
      workstreamId,
      strId,
      ...(imgName && { imgName }),
      ...(enableSynonyms && { enableSynonyms }),
      docImage: docImg,
      similarDocId,
    },
    data: {
      qJson: query,
      filters: [],
    },
  });
};

export default getAggrFiltersApi;
