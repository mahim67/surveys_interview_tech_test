import { Link } from "react-router-dom";
import React from "react";
import UserContext from "../../Context/UserContext";
function Navbar({ children }) {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand text-success" to="/">
            <h2>Feedback Survey</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <UserContext.Consumer>
                {({ user }) => {
                  return (
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        aria-current="page"
                        to="/feedbacks"
                      >
                        Feedback
                      </Link>
                    </li>
                  );
                }}
              </UserContext.Consumer> */}
            </ul>
            <UserContext.Consumer>
              {({ user, handleLogout }) => {
                return (
                  <div className="d-flex justify-content-around">
                    <div>
                      <h5 className="mb-0">{user.name}</h5>
                      <small>{user.email}</small>
                    </div>
                    <div className="mt-2 mx-4">
                      <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                );
              }}
            </UserContext.Consumer>
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </div>
  );
}

export default Navbar;
