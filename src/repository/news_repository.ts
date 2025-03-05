import apiConfig from "../config/axiosConfig";
import type { NewsRequestModel } from "../model/request/NewsRequestModel";
import type { NewsResponseModel } from "../model/response/NewsResponseModel";

async function fetchAllNews(): Promise<NewsResponseModel[]> {
  const response = await apiConfig.get("/news");
  const data = await response.data;

  const cities: NewsResponseModel[] = data;
  return cities;
}

async function postNews(newsItem: NewsRequestModel) {
  const response = await apiConfig.post("/news", newsItem);
  const data = await response.data;
  const news: NewsResponseModel[] = data;
  return news;
}

async function deleteNews(id: number) {
  const response = await apiConfig.delete(`/news/${id}`);
  const data = await response.data;
  const news: NewsResponseModel[] = data;
  return news;
}

export { fetchAllNews, postNews, deleteNews };
