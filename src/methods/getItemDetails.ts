import {
  UBI_APPID_Marketplace,
  UBI_SESSIONID_MARKETPLACE,
  UBI_LOCALECODE,
  UBI_REGIONID_MARKETPLACE,
  X_PLATFORM_APPID,
  GraphQL_ItemDetailsQuery,
  UBI_MARKETPLACE_URI,
} from '../constants';
import { Item } from '../interfaces/marketplace';
import { ApiClient } from './apiClient';
import { CheckToken } from './auth';
import { MapMarketData } from '../utils/helperFunctions';

const defualtItem: Item = {
  id: '',
  assetUrl: '',
  itemId: '',
  name: '',
  tags: [],
  type: '',
};

export const getItemDetails = async (itemId: string): Promise<Item> => {
  var token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID_Marketplace,
    'Ubi-SessionId': UBI_SESSIONID_MARKETPLACE,
    'ubi-localecode': UBI_LOCALECODE,
    'ubi-regionid': UBI_REGIONID_MARKETPLACE,
    'x-platform-appid': X_PLATFORM_APPID,
    // 'ubi-profileId': '', doesnt look this is needed?
    'Content-Type': 'application/json',
  };

  const body = [
    {
      operationName: 'GetItemDetails',
      variables: {
        spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
        itemId: itemId,
        tradeId: '',
        fetchTrade: false,
      },
      query: GraphQL_ItemDetailsQuery,
    },
  ];

  const response = await ApiClient(UBI_MARKETPLACE_URI, headers, 'POST', body);

  const item = await extractItem(response);

  return item;
};

const extractItem = async (data: any): Promise<Item> => {
  if (data === undefined) return defualtItem;

  data.forEach(async (item: any) => {
    const itemDetails = item.data.game.marketableItem;
    const tags = itemDetails.item.tags as string[];

    if (itemDetails) {
      const marketData = await MapMarketData(itemDetails.marketData);

      defualtItem.id = itemDetails.item.id;
      defualtItem.assetUrl = itemDetails.item.assetUrl;
      defualtItem.itemId = itemDetails.item.itemId;
      defualtItem.name = itemDetails.item.name;
      defualtItem.tags = tags;
      defualtItem.type = itemDetails.item.type;
      defualtItem.marktetData = marketData;
    }
  });

  return defualtItem;
};
