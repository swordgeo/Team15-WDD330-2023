//const baseURL = import.meta.env.VITE_SERVER_URL;
//Change once env is set on server
// const baseURL = "https://wdd330-backend.onrender.com/"
const baseURL = "http://server-nodejs.cit.byui.edu:3000/";

async function convertToJson(res) {
  response = await res.json();
  if (res.ok) {
    return response;
  } else {
    // throw new Error("Bad Response");
    throw { name: 'servicesError', message: response };
  }
}

export default class ExternalServices {
  constructor(category) {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
