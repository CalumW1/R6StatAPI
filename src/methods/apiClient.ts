import axios, { Method, RawAxiosRequestHeaders } from 'axios';

export const ApiClient = async (
  url: string,
  header: RawAxiosRequestHeaders,
  method: Method
): Promise<any> => {
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
