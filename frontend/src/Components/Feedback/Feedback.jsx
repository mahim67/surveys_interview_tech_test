import React, { useEffect, useState } from "react";
import { destroy, index } from "../../Service/FeedbackService";
import { Link } from "react-router-dom";

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_SERVER_URL;

export default function Feedback() {
  const [feedbackLists, setFeedbackLists] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await index();
      let { data: responseData } = response;
      if (responseData.status && responseData.status == "ok") {
        setFeedbackLists(responseData.data);
      }
    })();
  }, []);
  const deleteFeedback = async (event, id) => {
    const buttonRef = event.currentTarget;
    const { data: data } = await destroy(id);

    if (data.status && data.status == "ok") {
      alert(data.msg);
      buttonRef.closest("tr").remove();
    }
  };

  /* Feedback Link Copied function */
  const copyFeedbackUrl = (link) => {
    const textarea = document.createElement("textarea");
    textarea.textContent = FRONTEND_URL + `/feedbacks/${link}`;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copied");
  };

  return (
    <div>
      <div className="card card-body mt-3">
        <h3>List of Feedback</h3>
        <div>
          <Link
            to="/feedbacks/create"
            className="btn btn-primary btn-sm mt-2 mb-4"
          >
            Add Feedback
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-sm table-bordered table-hover">
            <thead className="table-primary">
              <tr className="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbackLists.length ? (
                feedbackLists.map((feedback, index) => (
                  <tr key={feedback.id}>
                    <td className="text-center">{++index}</td>
                    <td>{feedback?.name}</td>
                    <td>{feedback?.description}</td>
                    <td className="text-center">
                      <Link
                        to={`/feedbacks/${feedback.id}/questions`}
                        className="btn btn-sm btn-outline-primary m-1"
                      >
                        Questions
                      </Link>

                      <Link
                        to={`/feedbacks/${feedback.id}/responses`}
                        className="btn btn-sm btn-outline-secondary m-1"
                      >
                        Surveys
                      </Link>

                      <Link
                        to={`/feedbacks/${feedback.id}/update`}
                        className="btn btn-sm btn-outline-info"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={(e) => deleteFeedback(e, feedback.id)}
                        className="btn btn-outline-danger m-1 btn-sm"
                      >
                        Delete
                      </button>
                      {feedback.link && (
                        <button
                          onClick={() => copyFeedbackUrl(feedback.link)}
                          className="btn btn-sm btn-outline-success m-1"
                        >
                          Link
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={4}>No Records Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
