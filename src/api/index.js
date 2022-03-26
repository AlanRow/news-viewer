const API_URL = "https://rosrezerv.gov.ru/api/news";

export async function getNews(url = API_URL) {
  const resp = await fetch(url);
  const respObj = await resp.json();
  return respObj.data.map(parseNewsItem);
}

function parseNewsItem(data) {
  return {
    title: data.title ?? null,
    description: data.preview ?? null,
    image: data.image ?? null,
    date: data.date ? new Date(data.date) : null,
    link: data.link ?? null,
  };
}
