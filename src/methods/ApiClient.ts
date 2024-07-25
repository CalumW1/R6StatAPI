import fetch from 'node-fetch';

export const ApiClient = async (url: string, header: any, method: string): Promise<any> => {
  const response = await fetch(url, {
    method: method,
    headers: header,
  });

  if (!response.ok) throw Error('Error with response');

  return response;
};
