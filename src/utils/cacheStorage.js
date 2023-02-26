const getCacheKey = (cacheName, requestedUrl) => `${cacheName}_${requestedUrl}`;

const hasCacheExpired = (responseBody, expiresRangeMillis) => {
  const date = new Date(responseBody.date);
  const today = new Date();
  return today - date > expiresRangeMillis;
};

const getCachedRequest = (cacheName, requestedUrl, expiresRangeMillis) => {
  const key = getCacheKey(cacheName, requestedUrl);
  // eslint-disable-next-line no-undef
  const response = localStorage.getItem(key);
  if (!response) {
    return null;
  }

  const responseBody = JSON.parse(response);
  if (hasCacheExpired(responseBody, expiresRangeMillis)) {
    return null;
  }
  return responseBody;
};

const setCacheResponse = (cacheName, requestedUrl, responseBody) => {
  const response = JSON.stringify({ response: responseBody, date: new Date() });
  // eslint-disable-next-line no-undef
  localStorage.setItem(getCacheKey(cacheName, requestedUrl), response);
};

export { getCachedRequest, setCacheResponse };
