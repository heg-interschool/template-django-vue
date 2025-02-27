import api from "@/services/api"
import { ref } from "vue"

let user = ref()

export default {
  user,
  login(payload) {
    if (!payload.username || !payload.password) {
      return Promise.reject("Username and password are required.")
    }

    return api.post(`allauth/browser/v1/auth/login`, payload).then((response) => {
      user.value = response.data.data.user
      return response.data.data.user
    })
  },
  logout() {
    return api.delete(`allauth/browser/v1/auth/session`).then((response) => {
      user.value = undefined
      return response.data
    })
  },
  register(payload) {
    if (!payload.username || !payload.password) {
      return Promise.reject("username and password required")
    }

    return api.post(`allauth/browser/v1/auth/signup`, payload).then((response) => {
      user.value = response.data.data.user
      return response.data.data.user
    })
  },
  // allows to relogin with saved token
  getUser() {
    return api
      .get(`allauth/browser/v1/auth/session`)
      .then((response) => {
        user.value = response.data.data.user
      })
      .catch(() => {
        user.value = undefined
      })
  }
}
