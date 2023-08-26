import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  destroy,
  index,
  store,
} from "../../../Service/FeedbackQuestionService";

export default function Question() {
  const { feedbackId } = useParams();
  const formRef = useRef();

  const [feedback, setFeedback] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [element, setElement] = useState({
    question: "",
    feedback_id: feedbackId,
  });

  useEffect(() => {
    (async () => {
      const { data: data } = await index(feedbackId);
      if (data.status && data.status == "ok") {
        setFeedback(data.feedback);
        setQuestions(data.data);
      }
    })();
  }, [feedbackId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElement({ ...element, [name]: value });
  };

  /* Form Submit Function */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data: data } = await store(element, feedbackId);
    if (data.status && data.status == "ok") {
      const newQues = data.data;
      setQuestions([...questions, newQues]);
      setElement({ question: "", feedback_id: feedbackId });
      alert(data.msg);
    } else {
      console.error(data.error);
    }
  };

  /* Row Delete Function */
  const deleteQuestion = async (event, id) => {
    const buttonRef = event.currentTarget;
    const { data: data } = await destroy(id);

    if (data.status && data.status == "ok") {
      alert(data.msg);
      buttonRef.closest("tr").remove();
    }
  };

  return (
    <div>
      <div className="card card-body mt-3">
        <h3>{feedback?.name}</h3>
        <div>
          <Link to="/feedbacks" className="btn btn-primary btn-sm ml-3">
            FeedBack
          </Link>
        </div>
        <div className="row">
          <div className="col-md-4">
            <form ref={formRef} onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="question" className="mt-3">
                  Add New Question
                </label>
                <textarea
                  name="question"
                  className="form-control"
                  rows={3}
                  value={element.question}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <button type="submit" className="btn btn-sm btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <h5>List of Questions</h5>
            <div className="table-responsive">
              <table className="table table-sm table-hover table-bordered">
                <thead className="text-center">
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.length > 0 ? (
                    questions.map((question, index) => (
                      <tr key={question.id}>
                        <td className="text-center">{++index}</td>
                        <td>{question.question}</td>
                        <td className="text-center">
                          <Link
                            to={`/feedbacks/${feedbackId}/questions/${question.id}/update`}
                            className="btn btn-sm btn-outline-info"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteQuestion(e, question.id)}
                            className="btn btn-outline-danger m-1 btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan={3}>No Records Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
