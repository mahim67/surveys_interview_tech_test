import React, { useContext, useRef, useState } from "react";
import { store } from "../../Service/FeedbackService";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";

export default function CreateFeedback() {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const feedbackForm = useRef();
  const [feedback, setFeedback] = useState({
    name: "",
    description: "",
    user_id: user.id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data: data } = await store({ ...feedback, user_id: user.id });

    if (data.status && data.status == "ok") {
      alert(data.msg);
      setFeedback({ name: "", description: "", user_id: user.id });
      navigate("/feedbacks");
    }
  };
  return (
    <>
      <h3>Feedback Form</h3>
      <div>
        <Link to="/feedbacks" className="btn btn-primary btn-sm mt-2 mb-4">
          Feedbacks
        </Link>
      </div>
      <div className="w-50">
        <form ref={feedbackForm} onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={feedback.name}
              onChange={handleChange}
              required
              placeholder="Enter Feedback Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              rows="3"
              onChange={handleChange}
              className="form-control"
              value={feedback.description}
            >
            </textarea>
          </div>
          <button type="submit" className="btn btn-sm btn-success mt-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
