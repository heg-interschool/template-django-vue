import api from "@/services/api";
import { ref } from "vue";

let access_token = undefined;
let user = ref();

api.interceptors.request.use((config) => {
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

export default {
  user,
  login(payload) {
    if (!payload.username || !payload.password) {
      return Promise.reject("Username and password are required.");
    }

    return api.post(`dj-rest-auth/login/`, payload).then((response) => {
      access_token = response.data.access_token;
      user.value = response.data.user;
      return response.data.user;
    });
  },
  logout() {
    return api.post(`dj-rest-auth/logout/`).then((response) => {
      access_token = undefined;
      user.value = undefined;
      return response.data;
    });
  },
  register(payload) {
    if (!payload.username || !payload.password1 || !payload.password2) {
      return Promise.reject(
        "Username and password1 and password2 are required."
      );
    }

    return api.post(`dj-rest-auth/registration/`, payload).then((response) => {
      access_token = response.data.access_token;
      user.value = response.data.user;
      return response.data.user;
    });
  },
};
