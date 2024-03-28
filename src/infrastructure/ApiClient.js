import fetch from 'node-fetch';

export const ApiClient = async (URI, Headers, Mehtod) => {
  const response = await fetch(URI, {
    method: Mehtod,
    headers: Headers,
  });

  // we should check the response of the API and handle accordingly.

  return await response.json();
};
