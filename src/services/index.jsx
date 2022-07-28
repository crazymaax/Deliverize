import axios from "axios";

export const instance = axios.create({
  baseURL: "https://6077803e1ed0ae0017d6aea4.mockapi.io/test-frontend/",
});
