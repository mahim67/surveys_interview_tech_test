import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import { getCurrentUser } from "./Service/UserService";
import UserContext from "./Context/UserContext";
import { useNavigate } from "react-router-dom";
import { logout } from "./Service/AuthService";
import CreateFeedback from "./Components/Feedback/CreateFeedback";
import Feedback from "./Components/Feedback/Feedback";
import UpdateFeedback from "./Components/Feedback/UpdateFeedback";
import Question from "./Components/Feedback/Questions/Question";
import CreateQuestion from "./Components/Feedback/Questions/UpdateQuestion";
import QuestionResponses from "./Components/Feedback/Questions/QuestionResponses";
import UserFeedbackResponse from "./Components/Feedback/UserFeedbackResponse";
import Navbar from "./Components/Layouts/Navbar";

function App() {
  const [user, setUser] = useState({});
  const navigation = useNavigate();
  useEffect(() => {
    if (!Object.keys(user).length) {
      (async () => {
        let userResponse = await getCurrentUser();
        let { data: userData } = userResponse;
        if (userData.status && userData.status == "ok") {
          setUser(userData.data);
        }
      })();
    }
  });

  const handleLogout = async () => {
    await logout();
    setUser({});
    navigation("/login");
  };

  return (
    <div className="container">
      <UserContext.Provider value={{ user, handleLogout }}>
        
        {/* <Navbar /> */}

        <Routes>
          {/* Guest Routes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/feedbacks/:link" element={<UserFeedbackResponse />} />

          {/* Protected Routes */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Navbar>
                  <Feedback />
                </Navbar>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <ProtectedRoute>
                <Navbar>
                  <Feedback />
                </Navbar>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/feedbacks"
            element={
              <ProtectedRoute>
                <Navbar>
                  <Feedback />
                </Navbar>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/feedbacks/create"
            element={
              <ProtectedRoute>
                <Navbar>
                  <CreateFeedback />
                </Navbar>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/feedbacks/:id/update"
            element={
              <ProtectedRoute>
                <Navbar>
                  <UpdateFeedback />
                </Navbar>
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/feedbacks/:feedbackId/questions"
            element={
              <ProtectedRoute>
                <Navbar>
                  <Question />
                </Navbar>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/feedbacks/:feedbackId/questions/:id/update"
            element={
              <ProtectedRoute>
                <Navbar>
                  <CreateQuestion />
                </Navbar>
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/feedbacks/:feedbackId/responses"
            element={
              <ProtectedRoute>
                <Navbar>
                  <QuestionResponses />
                </Navbar>
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
