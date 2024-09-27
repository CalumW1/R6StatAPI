import { MarketData, SellStats, BuyStats, LastSoldAt } from '../interfaces/marketplace';

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
