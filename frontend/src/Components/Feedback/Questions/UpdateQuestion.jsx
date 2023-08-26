import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { show, update } from "../../../Service/FeedbackQuestionService";

export default function UpdateQuestion() {
  const navigate = useNavigate();
  const { feedbackId, id } = useParams();
  const formRef = useRef();
  const [question, setQuestion] = useState({});

  useEffect(() => {
    (async () => {
      const { data: data } = await show(feedbackId, id);
      if (data.status && data.status == "ok") {
        setQuestion(data.data);
      }
    })();
  }, [feedbackId, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {data:data} = await update(question, id);
    if (data.status && data.status=='ok') {
      alert(data.msg);
      navigate(`/feedbacks/${feedbackId}/questions`);
    }
  };

  return (
    <div className="card card-body mt-3">
      <h3>Update Question</h3>
      <div className="my-3">
        <Link
          to={`/feedbacks/${feedbackId}/questions`}
          className="btn btn-sm btn-primary"
        >
          Questions
        </Link>
      </div>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="form group">
          <label htmlFor="question">Question</label>
          <textarea
            name="question"
            className="form-control"
            value={question?.question}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-sm btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
