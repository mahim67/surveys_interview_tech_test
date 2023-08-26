import http from "./HttpService";
const END_POINT = process.env.REACT_APP_SERVER_URL;

export function index() {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    return http.post(
      `${END_POINT}/api/feedbacks`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return error;
  }
}

export function store(data) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    return http.post(`${END_POINT}/api/feedbacks/store`, data, {
      headers: headers,
    });
  } catch (error) {
    return null;
  }
}

export function update(id, data) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(`${END_POINT}/api/feedbacks/${id}/update`, data, {
      headers: headers,
    });
  } catch (error) {
    return null;
  }
}

export function show(id) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/feedbacks/show/${id}`,
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
      `${END_POINT}/api/feedbacks/${id}/delete`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}

export function getFeedback(link) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(
      `${END_POINT}/api/feedbacks/get-feedback/${link}`,
      {},
      {
        headers: headers,
      }
    );
  } catch (error) {
    return null;
  }
}


export function userFeedbackResponses(id) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(`${END_POINT}/api/feedbacks/${id}/responses`, {}, {
      headers: headers,
    });
  } catch (error) {
    return null;
  }
}


export function submitRandomUserFeedback(data) {
  try {
    let accessToken = localStorage.getItem("accessToken");
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return http.post(`${END_POINT}/api/feedbacks/store-user-feedback`, data, {
      headers: headers,
    });
  } catch (error) {
    return null;
  }
}
