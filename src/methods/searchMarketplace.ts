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
import { ApiClient } from './apiClient';

export interface Items {
  items: Item[];
}

interface Item {
  id: string;
  assetUrl: string;
  itemId: string;
  name: string;
  tags: string[];
  type: string;
  marktetData: MarketData;
}

interface MarketData {
  id: string;
  sellStats?: SellStats;
  buyStats?: BuyStats;
  lastSoldAt?: LastSoldAt;
}

interface SellStats {
  id: string;
  paymentItemId: string;
  lowestPrice: number;
  highestPrice: number;
  activeCount: number;
}

const defaultSellStats: SellStats = {
  id: '',
  paymentItemId: '',
  lowestPrice: 0,
  highestPrice: 0,
  activeCount: 0,
};

interface BuyStats {
  id: string;
  paymentItemId: string;
  lowestPrice: number;
  highestPrice: number;
  activeCount: number;
}

const defaultBuyStats: BuyStats = {
  id: '',
  paymentItemId: '',
  lowestPrice: 0,
  highestPrice: 0,
  activeCount: 0,
};

interface LastSoldAt {
  id: string;
  paymentItemId: string;
  price: number;
  performedAt: string;
}

const defaultLostSoldAt: LastSoldAt = {
  id: '',
  paymentItemId: '',
  price: 0,
  performedAt: '',
};

export const Search = async (searchQuery: string): Promise<Items> => {
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
    'ubi-profileid': '',
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
        limit: 40,
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
      itemDetails.marketableItems.nodes.forEach(async (marketableItem: any) => {
        const tags = marketableItem.item.tags as string[];

        // this contains buy, sell and last sold information.
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

const MapMarketData = async (marketplaceData: any): Promise<MarketData> => {
  const id = marketplaceData.id;

  const sellStats: SellStats =
    Array.isArray(marketplaceData?.sellStats) && marketplaceData.sellStats.length > 0
      ? {
          id: marketplaceData.sellStats[0].id,
          paymentItemId: marketplaceData.sellStats[0].paymentItemId,
          lowestPrice: marketplaceData.sellStats[0].lowestPrice,
          highestPrice: marketplaceData.sellStats[0].highestPrice,
          activeCount: marketplaceData.sellStats[0].activeCount,
        }
      : defaultSellStats;

  const buyStats: BuyStats =
    Array.isArray(marketplaceData?.buyStats) && marketplaceData.buyStats.length > 0
      ? {
          id: marketplaceData.buyStats[0].id,
          paymentItemId: marketplaceData.buyStats[0].paymentItemId,
          lowestPrice: marketplaceData.buyStats[0].lowestPrice,
          highestPrice: marketplaceData.buyStats[0].highestPrice,
          activeCount: marketplaceData.buyStats[0].activeCount,
        }
      : defaultBuyStats;

  const lastSoldAt: LastSoldAt =
    Array.isArray(marketplaceData?.lastSoldAt) && marketplaceData.lastSoldAt.length > 0
      ? {
          id: marketplaceData.lastSoldAt[0].id,
          paymentItemId: marketplaceData.lastSoldAt[0].paymentItemId,
          price: marketplaceData.lastSoldAt[0].price,
          performedAt: marketplaceData.lastSoldAt[0].performedAt,
        }
      : defaultLostSoldAt;

  const marketData: MarketData = {
    id: id,
    sellStats: sellStats,
    buyStats: buyStats,
    lastSoldAt: lastSoldAt,
  };

  return marketData;
};
