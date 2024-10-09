import {
  GraphQL_GetTransactionHistory,
  UBI_APPID_Marketplace,
  UBI_LOCALECODE,
  UBI_MARKETPLACE_URI,
  UBI_REGIONID_MARKETPLACE,
  UBI_SESSIONID_MARKETPLACE,
  X_PLATFORM_APPID,
} from '../constants';
import {
  Item,
  Payment,
  PaymentOptions,
  Transaction,
  Transactions,
} from '../interfaces/marketplace';
import { ApiClient } from './apiClient';
import { CheckToken } from './auth';

export const GetTransactionHistroy = async (profileId: string, limit: number) => {
  const token = await CheckToken();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID_Marketplace,
    'Ubi-SessionId': UBI_SESSIONID_MARKETPLACE,
    'ubi-localecode': UBI_LOCALECODE,
    'ubi-regionid': UBI_REGIONID_MARKETPLACE,
    'x-platform-appid': X_PLATFORM_APPID,
    'ubi-profileid': profileId,
    'Content-Type': 'application/json',
  };

  const body = [
    {
      operationName: 'GetTransactionsHistory',
      variables: {
        spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
        limit: limit,
        offset: 0,
      },
      query: GraphQL_GetTransactionHistory,
    },
  ];

  const response = await ApiClient(UBI_MARKETPLACE_URI, headers, 'POST', body);
  return await MapResults(response);
};

const MapResults = async (data: any): Promise<Transactions> => {
  const transactions: Transactions = {
    transactions: [],
  };

  data.forEach((element: any) => {
    const itemDetails = element.data.game.viewer.meta;

    if (itemDetails.trades && itemDetails.trades.nodes.length > 0) {
      itemDetails.trades.nodes.forEach(async (item: any) => {
        const tradeItems = item.tradeItems;
        const paymentOptions = item.paymentOptions;
        const payment = item.payment;

        const transaction: Transaction = {
          id: item.id,
          tradeId: item.tradeId,
          state: item.state,
          category: item.category,
          createdAt: item.createdAt,
          expiresAt: item.expiresAt,
          lastModifiedAt: item.lastModifiedAt,
          tradeItems: await BuildTradeItems(tradeItems),
          paymentOptions: await BuildPaymentOptions(paymentOptions),
          payment: await BuildPayment(payment),
        };

        transactions.transactions.push(transaction);
      });
    }
  });

  return transactions;
};

const BuildTradeItems = async (tradeItems: any): Promise<Item> => {
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

const BuildPaymentOptions = async (options: any): Promise<PaymentOptions> => {
  const defualtPaymentOptions: PaymentOptions = {
    price: 0,
    transactionFee: 0,
    quantity: 0,
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

const BuildPayment = async (payment: any): Promise<Payment> => {
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