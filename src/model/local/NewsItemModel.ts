import type { NewsCategory } from "./NewsCategoryEnum";

export interface NewsItem {
  date: string;
  title: string;
  description: string;
  tag: NewsCategory;
  image: string;
  fullContent: string;
}
