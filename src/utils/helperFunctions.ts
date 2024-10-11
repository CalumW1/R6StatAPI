import {
  MarketData,
  SellStats,
  BuyStats,
  LastSoldAt,
  ItemRarity,
  Weapons,
  Operators,
  Event,
  EsportsTeams,
  OtherTypes,
  SortBy,
  PurchaseAvailableHighLow,
  PurchaseAvailableLowHigh,
  SaleAvailableHighLow,
  SaleAvailableLowHigh,
  LastSalePriceHighLow,
  LastSalePriceLowHigh,
  ItemNamesDESC,
  ItemNamesASC,
  MarkplaceSearchType,
  Item,
  PaymentOptions,
  Payment,
} from '../interfaces/marketplace';

// ============== Marketplace Helper Functions ==============

const defaultSellStats: SellStats = {
  id: '',
  paymentItemId: '',
  lowestPrice: 0,
  highestPrice: 0,
  activeCount: 0,
};

const defaultBuyStats: BuyStats = {
  id: '',
  paymentItemId: '',
  lowestPrice: 0,
  highestPrice: 0,
  activeCount: 0,
};

const defaultLostSoldAt: LastSoldAt = {
  id: '',
  paymentItemId: '',
  price: 0,
  performedAt: '',
};

export const MapMarketData = async (marketplaceData: any): Promise<MarketData> => {
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

export const BuildItemRarity = async (ItemRarityArray: string[]): Promise<string[]> => {
  if (ItemRarityArray.length === 0) return [];
  const rarity: string[] = [];

  ItemRarityArray.forEach(itemRarity => {
    const enumValue = ItemRarity[itemRarity as keyof typeof ItemRarity];
    if (enumValue) rarity.push(enumValue);
    else console.log("Enum values doesn't exists");
  });

  return rarity;
};

export const BuildWeapons = async (WeaponsArray: string[]): Promise<string[]> => {
  if (WeaponsArray.length === 0) return [];

  const weapons: string[] = [];

  WeaponsArray.forEach(weapon => {
    const enumValue = Weapons[weapon as keyof typeof Weapons];
    if (enumValue) weapons.push(enumValue);
    else console.log('Enum value not found');
  });

  return weapons;
};

export const BuildOperators = async (operatorsArray: string[]): Promise<string[]> => {
  if (operatorsArray.length === 0) return [];

  const operators: string[] = [];

  operatorsArray.forEach(operator => {
    const enumValue = Operators[operator as keyof typeof Operators];
    if (enumValue) operators.push(enumValue);
    else console.log('enum value was not found');
  });

  return operators;
};

export const BuildEvents = async (eventsArray: string[]): Promise<string[]> => {
  if (eventsArray.length === 0) return [];

  const events: string[] = [];

  eventsArray.forEach(event => {
    const enumValue = Event[event as keyof typeof Event];
    if (enumValue) events.push(enumValue);
    else console.log('enum value not found');
  });

  return events;
};

export const BuildEsportTeams = async (esportTeamsArray: string[]): Promise<string[]> => {
  if (esportTeamsArray.length === 0) return [];

  const esportsTeam: string[] = [];

  esportTeamsArray.forEach(team => {
    const enumValue = EsportsTeams[team as keyof typeof EsportsTeams];
    if (enumValue) esportsTeam.push(enumValue);
    else console.log('enum value not found');
  });

  return esportsTeam;
};

export const BuildOtherTypes = async (otherTypesArray: string[]): Promise<string[]> => {
  if (otherTypesArray.length === 0) return [];

  const otherTypes: string[] = [];

  otherTypesArray.forEach(otherType => {
    const enumValue = OtherTypes[otherType as keyof typeof OtherTypes];
    if (enumValue) otherTypes.push(enumValue);
    else console.log('enum value not found');
  });

  return otherTypes;
};

export const ReturnSortBy = async (
  sortBy: string,
  searchType: MarkplaceSearchType
): Promise<SortBy | undefined> => {
  switch (sortBy) {
    case 'Purchase available: high to low':
      return PurchaseAvailableHighLow;
    case 'Purchase available: low to high':
      return PurchaseAvailableLowHigh;
    case 'Sale available: high to low':
      return SaleAvailableHighLow;
    case 'Sale available: low to high':
      return SaleAvailableLowHigh;
    case 'Last sale price: high to low':
      return LastSalePriceHighLow;
    case 'Last sale price: low to high':
      return LastSalePriceLowHigh;
    case 'Item names: A-Z':
      return ItemNamesDESC;
    case 'Item names: Z-A':
      ItemNamesASC;
      break;
    default:
      if (searchType === 'sell') return PurchaseAvailableHighLow;
      else return SaleAvailableHighLow;
  }
};

export const BuildTradeItems = async (tradeItems: any): Promise<Item> => {
  const defaultItem: Item = {
    id: '',
    assetUrl: '',
    itemId: '',
    name: '',
    tags: [],
    type: '',
  };
  if (!tradeItems || tradeItems.length === 0) {
    return defaultItem;
  }

  const { id, itemId, assetUrl, name, tags, type } = tradeItems[0].item;

  return {
    id,
    itemId,
    assetUrl,
    name,
    tags,
    type,
  };
};

export const BuildPaymentOptions = async (options: any): Promise<PaymentOptions> => {
  const defualtPaymentOptions: PaymentOptions = {
    quantity: 0,
    price: 0,
    transactionFee: 0,
  };

  if (!options || options.length === 0) return defualtPaymentOptions;

  const { quantity } = options[0].item.viewer.meta;
  const { price, transactionFee } = options[0];

  return {
    quantity,
    price,
    transactionFee,
  };
};

export const BuildPayment = async (payment: any): Promise<Payment> => {
  const defualtPayment: Payment = {
    price: 0,
    transactionFee: 0,
  };

  if (!payment || payment.length === 0) return defualtPayment;

  const { price, transactionFee } = payment;

  return {
    price,
    transactionFee,
  };
};

// ==========================================================
