import { ApiClient } from './ApiClient';
import { AuthCommandHandler } from './AuthCommandHandler';
export async function GetServerStatusQueryHandler(platform) {
  const token = await AuthCommandHandler();

  const headers = {
    Authorization: `ubi_v1 t=${token}`,
    'Ubi-AppId': UBI_APPID,
    'Content-Type': 'application/json',
  };

  // this will need to come from the helper function.
  // const serverId = UBI_SERVER_IDS.find(x => x.id === platform).value;
  const URI = UBI_SERVER_STATUS_URI + UBI_GETSERVERSTATUS(serverId);

  const response = await ApiClient(URI, headers, 'GET');

  if (!response.ok) {
    throw new Error('Failed to fetch server status');
  }

  return transformData(response);
}

function transformData(data) {
  return data.reduce((acc, status) => {
    const object = {
      platform: status.Platform,
      status: status.Status,
      maintenance: status.Maintenance,
      impactedFeatures: status.ImpactedFeatures,
    };
    return { ...acc, ...object };
  }, {});
}
