import fetch from 'node-fetch';

export const ApiClient = async (url: string, header: any, method: string): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: header,
    });

    if (!response.ok) throw Error(`HTTP Error: ${response.status} - ${response.statusText}`);

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error has occured ${error.message}`);
    } else {
      console.error(`Unknown error has occured`);
    }
  }
};
