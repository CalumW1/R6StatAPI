import axios, { AxiosRequestHeaders, Method } from 'axios';

export const ApiClient = async (url: string, header: AxiosRequestHeaders, method: Method): Promise<any> => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: header,
    });

    return response.data;
  } catch (error) {
    throw new Error(`Error with response: ${(error as any).message}`);
  }
};
