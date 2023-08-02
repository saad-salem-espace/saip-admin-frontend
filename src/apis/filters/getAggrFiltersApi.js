const getAggrFiltersApi = ({
  workstreamId,
  query,
  strId,
  imageName,
  docImage,
  similarDocId,
  enableSynonyms,
  currentLang,
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
      imageName: 'd8lqDdyr-CRBEFVxWwAAb5wp.jpeg',
      ...(enableSynonyms && { enableSynonyms }),
      docImage: docImg,
      similarDocId,
      searchLanguage: currentLang,
    },
    data: {
      qJson: query,
      filters: [],
    },
  });
};

export default getAggrFiltersApi;
