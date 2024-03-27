import { GetServerStatusQueryHandler } from '../infrastructure/GetServerStatusQueryHandler';

export const GetServerStatusQuery = async platform => {
  try {
    return await GetServerStatusQueryHandler(platform);
  } catch (error) {
    console.log(error);
  }
};
