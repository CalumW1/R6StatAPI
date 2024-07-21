import fetch from 'node-fetch';

export const ApiClient = async (URI, Headers, Mehtod) => {
  try {
    const response = await fetch(URI, {
      method: Mehtod,
      headers: Headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
