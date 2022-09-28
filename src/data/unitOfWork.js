const axios = require("axios");

async function init(auth) {
  const axiosClient = axios.create({
    baseURL: `https://rest.gohighlevel.com/v1/`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.api_key}`,
    },
  });
  return axiosClient;
}

async function work(auth, fun) {
  const service = await init(auth);
  const res = await fun(service);
  return res;
}

module.exports = { work };
