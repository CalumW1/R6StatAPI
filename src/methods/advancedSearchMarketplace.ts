import {
  GraphQL_BuyableItemQuery,
  GraphQL_SellableItemsQuery,
  UBI_APPID_Marketplace,
  UBI_LOCALECODE,
  UBI_MARKETPLACE_URI,
  UBI_REGIONID_MARKETPLACE,
  UBI_SESSIONID_MARKETPLACE,
  X_PLATFORM_APPID,
} from '../constants';
import { Item, Items, MarkplaceSearchType, Tags, Types } from '../interfaces/marketplace';
import {
  BuildEsportTeams,
  BuildEvents,
  BuildItemRarity,
  BuildOperators,
  BuildOtherTypes,
  BuildWeapons,
  MapMarketData,
  ReturnSortBy,
} from '../utils/helperFunctions';
import { ApiClient } from './apiClient';
import { CheckToken } from './auth';

export const AdvancedSearch = async (
  searchTerm: string,
  searchType: MarkplaceSearchType,
  types: Types,
  tags: Tags,
  sortBy: string,
  limit: number
): Promise<Items> => {
  var token = await CheckToken();

  const query = searchTerm
    .split(' ')
    .map((word: string) => word + '*')
    .join(' ');

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID_Marketplace,
    'Ubi-SessionId': UBI_SESSIONID_MARKETPLACE,
    'ubi-localecode': UBI_LOCALECODE,
    'ubi-regionid': UBI_REGIONID_MARKETPLACE,
    'x-platform-appid': X_PLATFORM_APPID,
    'Content-Type': 'application/json',
  };

  const type = searchType === 'sell' ? 'GetSellableItems' : 'GetBuyableItems';

  const graphqlQuery =
    searchType === 'sell' ? GraphQL_SellableItemsQuery : GraphQL_BuyableItemQuery;

  var tagFilters = await BuildTagsFilterArray(tags);

  const newSortBy = await ReturnSortBy(sortBy, searchType);

  const body = [
    {
      operationName: type,
      variables: {
        withOwnership: false,
        spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
        limit: limit,
        offset: 0,
        filterBy: {
          text: query,
          tags: tagFilters, // Filters: Rarity, season, operator, weapon, event, Esports team, , other
          types: types.type,
        },
        sortBy: newSortBy,
      },
      query: graphqlQuery,
    },
  ];

  const response = await ApiClient(UBI_MARKETPLACE_URI, headers, 'POST', body);
  return await MapResults(response);
};

const BuildTagsFilterArray = async (tagsArray: Tags): Promise<any[][]> => {
  const tags: string[][] = [];

  const mappings = {
    rarity: BuildItemRarity,
    seasons: null,
    operators: BuildOperators,
    weapons: BuildWeapons,
    events: BuildEvents,
    EsportsTeams: BuildEsportTeams,
    others: BuildOtherTypes,
  };

  for (const [key, buildFunction] of Object.entries(mappings)) {
    const items = tagsArray[key as keyof Tags];
    if (Array.isArray(items) && items.length > 0) {
      if (buildFunction) tags.push(await buildFunction(items));
      else tags.push(items);
    }
  }

  return tags;
};

const MapResults = async (data: any): Promise<Items> => {
  const items: Items = {
    items: [],
  };

  data.forEach((element: any) => {
    const itemDetails = element.data.game.viewer.meta;

    if (itemDetails.marketableItems && itemDetails.marketableItems.nodes.length > 0) {
      itemDetails.marketableItems.nodes.forEach(async (recItem: any) => {
        const tags = recItem.item.tags as string[];

        const marketData = await MapMarketData(recItem.marketData);

        const newItem: Item = {
          id: recItem.item.id,
          assetUrl: recItem.item.assetUrl,
          itemId: recItem.item.itemId,
          name: recItem.item.name,
          tags: tags,
          type: recItem.item.type,
          marktetData: marketData,
        };

        items.items.push(newItem);
      });
    }
  });
  return items;
};
