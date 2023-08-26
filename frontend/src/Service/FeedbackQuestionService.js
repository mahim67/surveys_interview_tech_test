import http from "./HttpService";
const END_POINT = process.env.REACT_APP_SERVER_URL;

export function index(feedbackId) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    return http.post(
      `${END_POINT}/api/feedbacks/${feedbackId}/questions`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return error;
  }
}

export function store(data, feedbackId) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    return http.post(
      `${END_POINT}/api/feedbacks/${feedbackId}/questions/store`,
      data,
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}

export function update(data, id) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/feedbacks/questions/${id}/update`,
      data,
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}

export function show(feedbackId, id) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/feedbacks/${feedbackId}/questions/show/${id}`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}

export function destroy(id) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/feedbacks/questions/${id}/delete`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}
