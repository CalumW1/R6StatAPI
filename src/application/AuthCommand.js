import { AuthCommandHandler } from '../infrastructure/AuthCommandHandler.js';

export const AuthCommand = async (email, password) => {
  try {
    return await AuthCommandHandler(email, password);
  } catch (error) {
    console.log(error);
  }
};
