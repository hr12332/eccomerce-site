import React from "react";
import axios from "axios";
import { message } from "antd";

const API_ENDPOINT = "https://dummyjson.com/";

const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

const clientCustom = axios.create({
  baseURL: API_ENDPOINT,
});
class DataService {
  static get(path = "") {
    return client({
      method: "GET",
      url: path,
    });
  }
  static postFormData(path = "", data = {}) {
    console.log(
      "🚀 ~ file: dataService.js ~ line 29 ~ DataService ~ post ~ data",
      data
    );
    return clientCustom({
      method: "POST",
      url: path,
      data,
    });
  }

  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...optionalHeader },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data: data,
    });
  }

  static delete(path = "") {
    return client({
      method: "DELETE",
      url: path,
    });
  }

  static put(path = "", data = {}) {
    return client({
      method: "PUT",
      url: path,
      data: data,
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
let flag = false;
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie

  const requestConfig = config;

  const { headers } = config;
  requestConfig.headers = {
    ...headers,
  };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => {
    // console.log('interception : ', response.data.message)
    if (response.data.statusCode == 200) {
    } else if (
      response.data.message == "Action successfully performed for date"
    ) {
      //  console.log('Welcom Welcome Welciome ')
    } else if (
      response.data.message == "Attendance profile updated successfully"
    ) {
    } else if (response.data.message == "") {
    } else if (response.data.messageCode == "BALANCE_CREATED") {
    } else if (response.data.message == "Date created successfully") {
    }
    return response;
  },
  (error) => {
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      message.success(`${response.data.message}`);
    }
    return Promise.reject(error);
  }
);
export { DataService };
