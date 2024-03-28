import { GetUserByUserIdQueryHandler } from '../infrastructure/GetUserByUserIdQueryHandler.js';

export const GetUserByUserIdQuery = async userId => {
  try {
    return await GetUserByUserIdQueryHandler(userId);
  } catch (error) {
    console.log(error);
  }
};
