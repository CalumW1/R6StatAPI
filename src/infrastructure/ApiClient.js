import fetch from 'node-fetch';

export const ApiClient = async (URI, Headers, Mehtod) => {
  const response = await fetch(URI, {
    method: Mehtod,
    headers: Headers,
  });

  return await response.json();
};
