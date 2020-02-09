export const METHODS = {
  GET:'GET',
  POST:'POST',
  PUT:'PUT',
  DELETE:'DELETE'
}


export const Fetch = (method:string, apiUrl:string, data?:any) => {
  return fetch(
    apiUrl,
    {
      method: method,
      credentials: 'same-origin',
      headers: {
      'Content-Type': 'application/json'
      },
      body: data?JSON.stringify(data):null
    }
  ).then((response) => response.json());
}
