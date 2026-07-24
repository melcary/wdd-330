const baseURL = import.meta.env.VITE_SERVER_URL;


function convertToJson(res){
  if (res.ok) {
    return res.json();
  } else {
    console.log(res.status)
    console.log( res.text())
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {}
   async getData(category){
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    if (response.ok) {
      const data = await convertToJson(response);
      return data.Result;
    }
    else{
      console.log(response.status)
    }
  }
  async checkout(payload){
      const data = await fetch(`${baseURL}checkout`,{
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          "content-type": "application/json"
        }
      })
      return convertToJson(data)
  }
}
