import { CheckToken } from './auth';
import {
  UBI_APPID_Marketplace,
  UBI_SESSIONID_MARKETPLACE,
  UBI_LOCALECODE,
  UBI_REGIONID_MARKETPLACE,
  X_PLATFORM_APPID,
  GraphQL_RecommendedItemsQuery,
  UBI_MARKETPLACE_URI,
} from '../constants';
import { ApiClient } from './apiClient';
import { Item, Items } from '../interfaces/marketplace';
import { MapMarketData } from '../utils/helperFunctions';

export const RecommendedItems = async (profileId: string): Promise<Items> => {
  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID_Marketplace,
    'Ubi-SessionId': UBI_SESSIONID_MARKETPLACE,
    'ubi-localecode': UBI_LOCALECODE,
    'ubi-regionid': UBI_REGIONID_MARKETPLACE,
    'x-platform-appid': X_PLATFORM_APPID,
    'ubi-profileId': profileId,
    'Content-Type': 'application/json',
  };

  const body = [
    {
      operationName: 'GetUserItemRecommendations',
      variables: {
        withOwnership: true,
        spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
        limit: 20,
        projectId: 'marketplace-user-recommendation',
        categoryId: 'default',
      },
      query: GraphQL_RecommendedItemsQuery,
    },
  ];

  const response = await ApiClient(UBI_MARKETPLACE_URI, headers, 'POST', body);
  const results = await MapSearchResults(response);

  return results;
};

const MapSearchResults = async (data: any): Promise<Items> => {
  const items: Items = {
    items: [],
  };

  data.forEach((element: any) => {
    const itemDetails = element.data.game.viewer.meta;

    if (
      itemDetails.marketplaceRecommendations &&
      itemDetails.marketplaceRecommendations.nodes.length > 0
    ) {
      itemDetails.marketplaceRecommendations.nodes.forEach(async (marketableItem: any) => {
        const tags = marketableItem.item.tags as string[];

        const marketPlaceData = await MapMarketData(marketableItem.marketData);

        const newItem: Item = {
          id: marketableItem.item.id,
          assetUrl: marketableItem.item.assetUrl,
          itemId: marketableItem.item.itemId,
          name: marketableItem.item.name,
          tags: tags,
          type: marketableItem.item.type,
          marktetData: marketPlaceData,
        };

        items.items.push(newItem);
      });
    }
  });

  return items;
};
