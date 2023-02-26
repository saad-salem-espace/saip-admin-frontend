const hasCacheExpired = (responseBody, expiresRangeMillis) => {
  const date = new Date(responseBody.date);
  const today = new Date();
  return today - date > expiresRangeMillis;
};

const getCachedRequest = async (cacheName, requestedUrl, expiresRangeMillis) => {
  // eslint-disable-next-line no-undef
  const cache = await caches.open(cacheName);
  const response = await cache.match(requestedUrl);
  if (!response) {
    return null;
  }

  const responseBody = await response.json();
  if (hasCacheExpired(responseBody, expiresRangeMillis)) {
    return null;
  }
  return responseBody;
};

const setCacheResponse = async (cacheName, requestedUrl, responseBody) => {
  // eslint-disable-next-line no-undef
  const cache = await caches.open(cacheName);
  // eslint-disable-next-line no-undef
  const response = new Response(JSON.stringify({ response: responseBody, date: new Date() }));
  await cache.put(requestedUrl, response);
};

export { getCachedRequest, setCacheResponse };
