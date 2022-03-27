import { addQueryParam } from "@/utils/urls";

const API_URL = "https://rosrezerv.gov.ru/api/news";

export async function getNews(page) {
  let pageUrl = API_URL;

  if (page) {
    pageUrl = addQueryParam(pageUrl, "page", page);
  }

  const resp = await fetch(pageUrl);
  const respObj = await resp.json();

  const news = respObj.data.map(parseNewsItem);
  const currentPage = respObj.meta.current_page;
  const totalPages = respObj.meta.last_page;

  return {
    news,
    currentPage,
    totalPages,
  };
}

function parseNewsItem(data) {
  return {
    id: data.id,
    title: data.title ?? null,
    description: data.preview ?? null,
    image: data.image ?? null,
    date: data.date ? new Date(data.date) : null,
    link: data.link ?? null,
  };
}
