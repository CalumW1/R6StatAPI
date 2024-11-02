import { NEWS_AUTH_TOKEN, UBI_GETNEWS, UBI_NEWS_URI } from '../constants';
import { News } from '../interfaces/news';
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
): Promise<any> => {
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

  console.log(JSON.stringify(data));
};
