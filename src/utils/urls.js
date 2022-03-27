export function addQueryParam(urlString, paramName, paramValue) {
  const urlObject = new URL(urlString);
  urlObject.searchParams.set(paramName, paramValue);
  return urlObject.toString();
}
