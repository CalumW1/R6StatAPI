import { GetServerStatusQueryHandler } from '../infrastructure/GetServerStatusQueryHandler.js';

export const GetServerStatusQuery = async platform => {
  try {
    return await GetServerStatusQueryHandler(platform);
  } catch (error) {
    console.log(error);
  }
};
