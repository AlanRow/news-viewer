const API_URL = "https://rosrezerv.gov.ru/api/news";

export async function getNews(url = API_URL) {
  const resp = await fetch(url);
  const respObj = await resp.json();

  const news = respObj.data.map(parseNewsItem);
  const links = respObj.meta.links.map(parsePageLink);
  const next = respObj.links.next ?? null;

  return {
    news,
    links,
    next,
  };
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

function parsePageLink(data) {
  return {
    active: data.active ?? false,
    url: data.url ?? null,
    label: data.label ?? "-",
  };
}
