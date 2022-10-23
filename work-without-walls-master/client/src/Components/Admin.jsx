import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
const Admin = () => {
  const navigate = useNavigate();
  const [currentBtnState, setcurrentBtnState] = useState("dashboard");
  const [allUsers, setallUsers] = useState([]);
  const { setuser } = useContext(UserContext);
  useEffect(() => {
    axios
      .get("/api/")
      .then((res) => {
        setallUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [currentBtnState]);

  const approveUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const disapproveUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: false })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const blockUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: false })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    axios
      .delete(`/admin/delete-user/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="bg-dark">
        <Link to="/">
          <img src={logo} style={{ padding: "1rem" }}></img>
        </Link>
      </div>
      <div className="row">
        <div className="col-2 ">
          <nav className="bg-dark vh-100">
            <ul class="nav  bg-dark mb-0">
              <li class="nav-item" style={{ padding: "1rem" }}>
                <button
                  onClick={() => setcurrentBtnState("dashboard")}
                  class="btn btn-light btn-block btn-sm rounded"
                >
                  {" "}
                  Dashboard{" "}
                </button>
              </li>
              <li class="nav-item" style={{ padding: "1rem" }}>
                <button
                  onClick={() => setcurrentBtnState("view")}
                  class="btn btn-light btn-block btn-sm rounded"
                >
                  {" "}
                  View Profile{" "}
                </button>
              </li>
              <li class="nav-item" style={{ padding: "0.5rem" }}>
                <button
                  onClick={() => setcurrentBtnState("delete")}
                  class="btn btn-light btn-sm"
                >
                  {" "}
                  Delete Account{" "}
                </button>
              </li>
              <li class="nav-item" style={{ padding: "1rem" }}>
                <button
                  onClick={() => setcurrentBtnState("block")}
                  class="btn btn-light btn-block btn-sm rounded"
                >
                  {" "}
                  Block Account{" "}
                </button>
              </li>
              <li class="nav-item ml-auto" style={{ padding: "1rem" }}>
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setuser(null);
                    navigate("/login");
                  }}
                  class="btn btn-light btn-block btn-sm  rounded"
                >
                  {" "}
                  Logout{" "}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-9" style={{ padding: "1rem" }}>
          <div className="container">
            {allUsers.map((user) => (
              <div
                className="container text-black pt-2"
                style={{ border: "1px solid black", backgroundColor: "gray" }}
                key={user._id}
              >
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Name:</i> {user.firstname}{" "}
                  {user.lastname}
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Email:</i> {user.email}
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Cnic:</i> {user["CNIC"]}
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Cnic:</i> <a href={user["cnicFront"]}></a>{user["cnicFront"]}
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Cnic:</i> <a href={user["cnicBack"]}>{user["cnicBack"]} </a>
                </p>
                <p>
                  {" "}
                  <i style={{ fontWeight: "bold" }}>Phone:</i> {user.phone}
                </p>
                {currentBtnState === "view" && (
                  <>
                    <button
                      className={`btn btn-primary btn-sm ${
                        user.approve ? "disabled" : ""
                      }`}
                      onClick={() => {
                        approveUser(user._id);
                        console.log(user._id, user.approve);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className={`btn btn-danger btn-sm ${
                        user.approve ? "" : "disabled"
                      }`}
                      onClick={() => disapproveUser(user._id)}
                    >
                      Disapprove
                    </button>
                  </>
                )}
                {currentBtnState === "delete" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                )}
                {currentBtnState === "block" && (
                  <button
                    className={`btn btn-danger btn-sm ${
                      user.approve ? "" : "disabled"
                    }`}
                    onClick={() => blockUser(user._id)}
                  >
                    Block
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
