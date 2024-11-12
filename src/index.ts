import { Auth } from './methods/auth';
import { GetUserByUsername, User } from './methods/getUserByUsername';
import { GetUserByUserId } from './methods/getUserByUserId';
import { GetUserProgression, Progression } from './methods/getUserProgression.js';
import { GetServerStatus, ServerStatus } from './methods/getServerStatus';
import { GetUserRank, UserRank } from './methods/getUserRank.js';
import { GetOperator, GameModes } from './methods/getOperator';
// import { GetUserStats, UserStats } from './methods/GetUserStats';
import { Search } from './methods/searchMarketplace';
import {
  Item,
  Items,
  MarkplaceSearchType,
  Tags,
  Transactions,
  Types,
} from './interfaces/marketplace';
import { RecommendedItems } from './methods/recommendedItems';
import { getItemDetails } from './methods/getItemDetails';
import { AdvancedSearch } from './methods/advancedSearchMarketplace';
import { GetTransactionsPending } from './methods/getPendingTransactions';
import { GetTransactionHistroy } from './methods/getTransactionHistory';
import { GetNews } from './methods/getNews';
import { News } from './interfaces/news';
import { GetNewsById } from './methods/getNewsById';

export class R6StatAPI {
  constructor() {
  }
  public async login(email: string, password: string): Promise<string> {
    return await Auth(email, password);
  }

  public async getUserByUsername(username: string, platform: string): Promise<User> {
    return await GetUserByUsername(username, platform);
  }

  public async getUserByUserId(userId: string): Promise<User[] | []> {
    return await GetUserByUserId(userId);
  }

  public async getUserProgression(userId: string): Promise<Progression> {
    return await GetUserProgression(userId);
  }

  public async getServerStatus(platform: string): Promise<ServerStatus> {
    return await GetServerStatus(platform);
  }

  public async getUserRank(userId: string, platform: string): Promise<UserRank> {
    return await GetUserRank(userId, platform);
  }

  public async getUserOperators(
    userId: string,
    platform: string,
    view: string,
    aggregation: string,
    gameMode: string,
    teamRole: string,
    season: string
  ): Promise<GameModes> {
    return await GetOperator(userId, platform, view, aggregation, gameMode, teamRole, season);
  }

  // TODO fix this
  // public async getUserStats(
  //   userId: string,
  //   platform: string,
  //   view: string,
  //   aggregation: string,
  //   gameMode: string,
  //   teamRole: string,
  //   season: string
  // ): Promise<UserStats> {
  //   return await GetUserStats(userId, platform, view, aggregation, gameMode, teamRole, season);
  // }

  public async SearchMarketplace(searchQuery: string, limit: number): Promise<Items> {
    return await Search(searchQuery, limit);
  }

  public async getRecommendedItems(profileId: string, limit: number): Promise<Items> {
    return await RecommendedItems(profileId, limit);
  }

  public async getItemDetails(itemId: string): Promise<Item> {
    return await getItemDetails(itemId);
  }

  public async advancedMarketplaceSearch(
    searchTerm: string,
    marketplaceType: MarkplaceSearchType,
    types: Types,
    tags: Tags,
    sortBy: string,
    limit: number
  ) {
    return await AdvancedSearch(searchTerm, marketplaceType, types, tags, sortBy, limit);
  }

  public async GetPendingtransactions(profileId: string, limit: number): Promise<Transactions> {
    return await GetTransactionsPending(profileId, limit);
  }

  public async GetTransactionHistory(profileId: string, limit: number): Promise<Transactions> {
    return await GetTransactionHistroy(profileId, limit);
  }

  public async GetNews(
    categoriesFilter: string,
    mediaFilter: string,
    placementFilter: string,
    locale: string,
    fallbackLocale: string,
    limit: number,
    skip: number,
    startIndex: number
  ): Promise<News> {
    return await GetNews(
      categoriesFilter,
      mediaFilter,
      placementFilter,
      locale,
      fallbackLocale,
      limit,
      skip,
      startIndex
    );
  }

  public async GetNewsById(id: string, locale: string, fallbackLocale: string): Promise<News> {
    return await GetNewsById(id, locale, fallbackLocale);
  }
}
