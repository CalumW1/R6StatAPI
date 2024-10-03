import {
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
} from '../utils/helperFunctions';
import { ApiClient } from './apiClient';
import { CheckToken } from './auth';

export const AdvancedSearch = async (
  searchTerm: string,
  searchType: MarkplaceSearchType,
  types: Types,
  tags: Tags
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

  const nonEmptyTypes: any[][] = [];

  var tagFilters = await BuildTagsFilterArray(tags);

  Object.values(types).forEach(value => {
    if (Array.isArray(value) && value.length > 0) {
      nonEmptyTypes.push(value);
    }
  });

  const body = [
    {
      operationName: type,
      variables: {
        withOwnership: false,
        spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
        limit: 40,
        offset: 0,
        filterBy: {
          text: query,
          tags: tagFilters, // Filters: Rarity, season, operator, weapon, event, Esports team, , other
          types: nonEmptyTypes, // Filters: types
        },
        sortBy: {
          field: 'ACTIVE_COUNT',
          orderType: 'Buy',
          direction: 'DESC',
          paymentItemId: '9ef71262-515b-46e8-b9a8-b6b6ad456c67',
        },
      },
      query: GraphQL_SellableItemsQuery,
    },
  ];

  const response = await ApiClient(UBI_MARKETPLACE_URI, headers, 'POST', body);
  return await MapResults(response);
};

const BuildTagsFilterArray = async (tagsArray: Tags): Promise<any[][]> => {
  const tags: string[][] = [];

  if (Array.isArray(tagsArray.rarity) && tagsArray.rarity.length > 0) {
    const items = await BuildItemRarity(tagsArray.rarity);
    tags.push(items);
  }

  if (Array.isArray(tagsArray.seasons) && tagsArray.seasons.length > 0) {
    tags.push(tagsArray.seasons);
  }

  if (Array.isArray(tagsArray.operators) && tagsArray.operators.length > 0) {
    const operators = await BuildOperators(tagsArray.operators);
    tags.push(operators);
  }

  if (Array.isArray(tagsArray.weapon) && tagsArray.weapon.length > 0) {
    const weapons = await BuildWeapons(tagsArray.weapon);
    tags.push(weapons);
  }

  if (Array.isArray(tagsArray.events) && tagsArray.events.length > 0) {
    const events = await BuildEvents(tagsArray.events);
    tags.push(events);
  }

  if (Array.isArray(tagsArray.esportsTeams) && tagsArray.esportsTeams.length > 0) {
    const esportsTeams = await BuildEsportTeams(tagsArray.esportsTeams);
    tags.push(esportsTeams);
  }

  if (Array.isArray(tagsArray.other) && tagsArray.other.length > 0) {
    const otherTypes = await BuildOtherTypes(tagsArray.other);
    tags.push(otherTypes);
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
        console.log(JSON.stringify(recItem));
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
