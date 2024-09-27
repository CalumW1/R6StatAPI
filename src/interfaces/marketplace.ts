export interface Items {
  items: Item[];
}

export interface Item {
  id: string;
  assetUrl: string;
  itemId: string;
  name: string;
  tags: string[];
  type: string;
  marktetData?: MarketData;
}

export interface MarketData {
  id: string;
  sellStats?: SellStats;
  buyStats?: BuyStats;
  lastSoldAt?: LastSoldAt;
}

export interface SellStats {
  id: string;
  paymentItemId: string;
  lowestPrice: number;
  highestPrice: number;
  activeCount: number;
}

export interface BuyStats {
  id: string;
  paymentItemId: string;
  lowestPrice: number;
  highestPrice: number;
  activeCount: number;
}

export interface LastSoldAt {
  id: string;
  paymentItemId: string;
  price: number;
  performedAt: string;
}
