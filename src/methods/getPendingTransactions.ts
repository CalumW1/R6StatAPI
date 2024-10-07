import { GraphQL_GetTransactionsPending, UBI_APPID_Marketplace, UBI_LOCALECODE, UBI_MARKETPLACE_URI, UBI_REGIONID_MARKETPLACE, UBI_SESSIONID_MARKETPLACE, X_PLATFORM_APPID } from "../constants";
import { Transactions } from "../interfaces/marketplace";
import { ApiClient } from "./apiClient";
import { CheckToken } from "./auth";

export const GetTransactionsPending = async (profileId: string): Promise<Transactions> => {

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
          operationName: "GetTransactionsPending",
          variables: {
            spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
            limit: 40,
            offset: 0,
          },
          query: GraphQL_GetTransactionsPending,
        },
    ];

    const response = await ApiClient(UBI_MARKETPLACE_URI, headers, 'POST', body);
    return await MapResults(response);

}

const MapResults = async (data: any): Promise<Transactions> => {
    console.log(data);
    const transactions: Transactions = {
        transactions: [],
      };
    return transactions;
}