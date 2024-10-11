import { CheckToken } from './auth';
import {
  UBI_APPID_Marketplace,
  UBI_SESSIONID_MARKETPLACE,
  UBI_LOCALECODE,
  UBI_REGIONID_MARKETPLACE,
  X_PLATFORM_APPID,
  GraphQL_SearchQuery,
  UBI_MARKETPLACE_URI,
} from '../constants';
import { Items, Item } from '../interfaces/marketplace';
import { ApiClient } from './apiClient';
import { MapMarketData } from '../utils/helperFunctions';

export const Search = async (searchQuery: string, limit: number): Promise<Items> => {
  // end of each of word we need to add * Looks something like this R4-C*
  const query = searchQuery
    .split(' ')
    .map((word: string) => word + '*')
    .join(' ');

  console.log(query);

  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID_Marketplace,
    'Ubi-SessionId': UBI_SESSIONID_MARKETPLACE,
    'ubi-localecode': UBI_LOCALECODE,
    'ubi-regionid': UBI_REGIONID_MARKETPLACE,
    'x-platform-appid': X_PLATFORM_APPID,
    'Content-Type': 'application/json',
  };

  const body = [
    {
      operationName: 'GetMarketableItems',
      variables: {
        withOwnership: true,
        spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
        limit: limit,
        offset: 0,
        filterBy: {
          text: query,
        },
        sortBy: {
          field: 'ACTIVE_COUNT',
          orderType: 'Sell',
          direction: 'DESC',
          paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
        },
      },
      query: GraphQL_SearchQuery,
    },
  ];

  const response = await ApiClient(UBI_MARKETPLACE_URI, headers, 'POST', body);
  const items = await MapSearchResults(response);
  return items;
};

const MapSearchResults = async (data: any): Promise<Items> => {
  const items: Items = {
    items: [],
  };

  data.forEach((element: any) => {
    const itemDetails = element.data.game;

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
