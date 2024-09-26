import axios, { AxiosRequestConfig, Method, RawAxiosRequestHeaders } from 'axios';

export const ApiClient = async (
  url: string,
  header: RawAxiosRequestHeaders,
  method: Method,
  body?: object
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: url,
      method: method,
      headers: header,
    };

    if (body && method === 'POST') config.data = body;

    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw new Error(`Error with response: ${(error as any).message}`);
  }
};
