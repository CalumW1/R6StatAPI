import { NEWS_AUTH_TOKEN, UBI_GETNEWS, UBI_NEWS_URI } from '../constants';
import { Button, News, NewsItems, Node, Thumbnail } from '../interfaces/news';
import { ApiClient } from './apiClient';

export const GetNews = async (
  categoriesFilter: string,
  mediaFilter: string,
  placementFilter: string,
  locale: string,
  fallbackLocale: string,
  limit: number,
  skip: number,
  startIndex: number
): Promise<News> => {
  const header = {
    Authorization: NEWS_AUTH_TOKEN,
  };

  const URI =
    UBI_NEWS_URI +
    UBI_GETNEWS(
      categoriesFilter,
      mediaFilter,
      placementFilter,
      locale,
      fallbackLocale,
      limit,
      skip,
      startIndex
    );

  const data = await ApiClient(URI, header, 'GET');

  return await BuildNews(data);
};

const BuildNews = async (data: any): Promise<News> => {
  const news: News = {
    total: data.total,
    tags: data.tags as string[],
    mediaFilter: data.mediaFilter,
    categoriesFilter: data.categoriesFilter,
    placementFilter: data.placementFilter as string[],
    limit: data.limit,
    startIndex: data.startIndex,
    skip: data.skip,
    items: await BuildNewsItems(data.items),
  };
  return news;
};

const BuildNewsItems = async (newsItems: any): Promise<NewsItems[]> => {
  const news: NewsItems[] = [];

  newsItems.forEach(async (item: any) => {
    const newsItem: NewsItems = {
      id: item.id,
      type: item.type,
      tag: item.tag,
      categories: item.categories as string[],
      placement: item.placement,
      date: item.date,
      title: item.title,
      abstract: item.abstract,
      content: item.content,
      trackingPageValue: item.trackingPageValue,
      readTime: item.readTime,
      author: item.authors,
      thumbnail: (item?.thumbnail as Thumbnail) ?? {},
      button: (item?.button as Button) ?? {},
      index: item?.index ?? 0,
      prevNode: (item?.prevNode as Node) ?? {},
      nextNode: (item?.nextNode as Node) ?? {},
    };
    news.push(newsItem);
  });

  return news;
};
