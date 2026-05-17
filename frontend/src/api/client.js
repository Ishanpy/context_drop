import axios from "axios";

const client = axios.create({

  baseURL:
    import.meta.env
      .VITE_API_BASE_URL,

  timeout: 30000,

  headers: {
    "Content-Type":
      "application/json",
  },

});

/* =========================
   REQUEST INTERCEPTOR
========================= */

client.interceptors.request.use(

  (config) => {

    console.log(
      "API REQUEST:",
      config.url
    );

    return config;

  },

  (error) => {
    return Promise.reject(error);
  }

);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

client.interceptors.response.use(

  (response) => response,

  (error) => {

    console.error(
      "API ERROR:",
      error
    );

    return Promise.reject(error);

  }

);

export default client;