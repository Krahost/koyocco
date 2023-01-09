// external Libraries
import { create } from "apisauce";
//  Do not change anything above this line if you're not sure about what you're doing.

const domain = "https://koyocco.com";
const apiKey = "77bc15b6-fa9e-4940-be8c-463f7da375a6";

const apiRequestTimeOut = 60000; // 30 secs

//  Do not change anything below this line if you're not sure about what you're doing.

const api = create({
  baseURL: domain + "/wp-json/rtcl/v1/",
  headers: {
    Accept: "application/json",
    "X-API-KEY": apiKey,
  },
  timeout: apiRequestTimeOut,
});

const setAuthToken = (token) =>
  api.setHeader("Authorization", "Bearer " + token);
const removeAuthToken = () => api.deleteHeader("Authorization");
const setMultipartHeader = () =>
  api.setHeader("Content-Type", "multipart/form-data");
const removeMultipartHeader = () => api.deleteHeader("Content-Type");
const setLocale = (lng) => api.setHeader("X-LOCALE", lng);

export default api;
export {
  setAuthToken,
  removeAuthToken,
  setMultipartHeader,
  removeMultipartHeader,
  setLocale,
  apiKey,
};
