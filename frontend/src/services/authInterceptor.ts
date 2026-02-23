import axios from "axios"
import { api, BASE_URL } from "./api"

export function setupInterceptors(handleLogout: () => void) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true

        const refreshToken = localStorage.getItem("@Auth:refreshToken")

        if (refreshToken) {
          try {
            const response = await axios.post(
              `${BASE_URL}/auth/refresh-token`,
              {
                refresh_token: JSON.parse(refreshToken),
              }
            )

            const newAccessToken = response.data.access_token

            localStorage.setItem(
              "@Auth:token",
              JSON.stringify(newAccessToken)
            )

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`

            return api(originalRequest)
          } catch {
            handleLogout()
          }
        } else {
          handleLogout()
        }
      }

      if (
        error.response?.status === 401
      ) {
        handleLogout()
      }

      return Promise.reject(error)
    }
  )
}