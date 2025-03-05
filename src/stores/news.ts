import { defineStore } from "pinia";
import { ref } from "vue";
import type { NewsItem } from "../model/local/NewsItemModel";
import type { NewsResponseModel } from "../model/response/NewsResponseModel";
import { fetchAllNews, postNews } from "../repository/news_repository";
import type { NewsRequestModel } from "../model/request/NewsRequestModel";

export const useNewsStore = defineStore("news", () => {
  const news = ref<NewsItem[]>([]);

  // Simulating API loading state
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const createNews = async (newsItem: NewsItem) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      news.value.unshift(newsItem);
    } catch (e) {
      error.value = "Failed to create news";
    } finally {
      isLoading.value = false;
    }
  };

  const updateNews = async (updatedItem: NewsItem) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const index = news.value.findIndex(
        (item) => item.date === updatedItem.date
      );
      if (index !== -1) {
        news.value[index] = updatedItem;
      }
    } catch (e) {
      error.value = "Failed to update news";
    } finally {
      isLoading.value = false;
    }
  };

  const loadNews = async () => {
    try {
      let newsResponse = await fetchAllNews();
      console.log("radi");
      let newsDTO: NewsItem[] = newsResponse.map((item: any) => ({
        date: item.created_at,
        title: item.title,
        description: item.content,
        tag: item.category,
        image: item.image_path,
        fullContent: item.content,
      }));

      news.value = newsDTO;
      console.log(news.value);
      isLoading.value = true;
      error.value = null;
    } catch (e) {
      error.value = "Failed to fetch news";
    } finally {
      isLoading.value = false;
    }
  };

  const addNewNews = async (newsItem: NewsRequestModel) => {
    try {
      await postNews(newsItem);
      loadNews();
    } catch (e) {
      error.value = "Failed to fetch news";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    news,
    isLoading,
    error,
    addNewNews,
    fetchNews: loadNews,
    createNews,
    updateNews,
  };
});
