import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userFeedbackResponses } from "../../../Service/FeedbackService";

export default function QuestionResponses() {
  const { feedbackId } = useParams();
  const [feedbackRes, setFeedbackRes] = useState(null);

  useEffect(() => {
    (async () => {
      const { data: data } = await userFeedbackResponses(feedbackId);
      if (data.status && data.status == "ok") {
        setFeedbackRes(data.feedback);
      }
    })();
  }, [feedbackId]);

  return (
    <div className="card card-body mt-3">
      <div className="d-flex justify-content-between">
        <h3>
          Topic : <u>{feedbackRes?.name}</u>
        </h3>
        <div className="mt-2">
          <Link to={`/feedbacks`} className="btn btn-sm btn-primary">
            Feedback
          </Link>
        </div>
      </div>
      <div className="mt-3">
        <table className="table table-sm table-hover">
          <tbody>
            {feedbackRes?.questions.length &&
              feedbackRes?.questions.map((question, index) => {
                return (
                  <>
                    <tr
                      key={`question-${question.id}`}
                      className="table-secondary"
                    >
                      <td colSpan={5}>
                        <h6>
                          Question {++index} : <b>{question?.question}</b>
                        </h6>
                      </td>
                    </tr>
                    {question?.answers?.length > 0 &&
                      question.answers.map((ans, indx) => {
                        return (
                          <tr>
                            <td className="text-center">{++indx}</td>
                            <td>{ans?.user_name}</td>
                            <td>{ans?.user_email}</td>
                            <td>{ans?.answer}</td>
                            <td title="Submitted At">
                              {ans?.created_at &&
                                new Date(ans?.created_at).toLocaleString(
                                  "en-us"
                                )}
                            </td>
                          </tr>
                        );
                      })}
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
