import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getFeedback,
  submitRandomUserFeedback,
} from "../../Service/FeedbackService";
import { useRef } from "react";

export default function UserFeedbackResponse() {
  const formRef = useRef();
  const { link } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [element, setElement] = useState({
    name: "",
    email: "",
  });
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    (async () => {
      const { data: data } = await getFeedback(link);
      if (data.status && data.status == "ok") {
        setFeedback(data.feedback);
        setQuestions(data?.feedback?.questions);
      }
    })();
  }, [link]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElement({ ...element, [name]: value });
  };
  const handleAnswersChange = (id, event) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newElement = {
      ...element,
      answers: answers,
      user_id: feedback.user_id,
      feedback_id: feedback.id,
    };

    const { data: data } = await submitRandomUserFeedback(newElement);
    if (data.status && data.status == "ok") {
      alert(data.msg);
      setElement({
        name: "",
        email: "",
      });
      window.location.reload('/')
      setAnswers([{}]);
    }
  };

  return (
    <div className="card card-body mt-3">
      <h2 className="text-center">Surveys</h2><hr/>
      <h3>Topic : {feedback?.name}</h3>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="form-group row">
          <div className="col-md-6">
            <h6>Your Name</h6>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={element.name}
              className="form-control"
              required
              placeholder="Enter your name..."
            />
          </div>
          <div className="col-md-6">
            <h6>Your Email</h6>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={element.email}
              className="form-control"
              required
              placeholder="Enter your email..."
            />
          </div>
        </div>
        <hr />
        <h5 className="ml-0 mt-3">Questions</h5>
        <hr />
        <ul>
          {questions.length &&
            questions.map((question, index) => (
              <li key={index} type="1">
                <h6>{question.question}</h6>
                <label htmlFor="">Answer :-</label>
                <textarea
                  name={question.id}
                  className="form-control"
                  value={answers[question.id] && answers[question.id].value}
                  onChange={(e) => handleAnswersChange(question.id, e)}
                />
              </li>
            ))}
        </ul>
        <div className="mt-3">
          <button type="submit" className="btn btn-sm btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
