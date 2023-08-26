import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { show, update } from "../../Service/FeedbackService";

export default function UpdateFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const feedbackForm = useRef();
  const [feedback, setFeedback] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    (async () => {
      let response = await show(id);
      let { data: responseData } = response;
      if (responseData.status && responseData.status == "ok") {
        setFeedback({
          name: responseData?.data?.name,
          description: responseData?.data?.description,
        });
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data: data } = await update(id, feedback);

    if (data.status && data.status == "ok") {
      alert(data.msg);
      setFeedback({ name: "", description: "" });
      navigate("/feedbacks");
    }
  };
  return (
    <>
      <h3>Update Feedback Form</h3>
      <div>
        <Link to="/feedbacks" className="btn btn-primary btn-sm mt-2 mb-4">
          Feedbacks
        </Link>
      </div>
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
            ></textarea>
        </div>
        <button type="submit" className="btn btn-sm btn-success mt-2">
          Update
        </button>
      </form>
    </>
  );
}
