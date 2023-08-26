import http from "./HttpService";
const END_POINT = process.env.REACT_APP_SERVER_URL;
export function getCurrentUser() {
  try {
    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/user`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
