import React, { useState, useEffect } from "react";
import logo from "../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import  { logoutUser } from "../api";
import "./navbars/sellerNavbar.css"
import Button from 'react-bootstrap/Button';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import {SidebarMenu, SidebarMenuBrand, SidebarMenuFooter, SidebarMenuHeader } from 'react-bootstrap-sidebar-menu';
const Admin = () => {
  const navigate = useNavigate();
  const [currentBtnState, setcurrentBtnState] = useState("dashboard");
  const [allUsers, setallUsers] = useState([]);
  const { setuser } = useContext(UserContext);
  const logoutUserClick = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // do nothing
    }
    localStorage.removeItem("user");
    setuser(null);
    navigate("/login");
  };
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
   <div className="container" style={{margin:"0px 0px 0px 0px",padding:"0px 0px 0px 0px"}}>
    <div className="row">
   <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
      className="col col-3"
    >
      <CDBSidebar textColor="#fff" backgroundColor="#1877f2">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link to="/" style={{ textDecoration: "none" }}>
                  <img
                       className="text-decoration-none"
                       style={{ textDecoration: "none",
                       width:"170px",height:"170px",
                      marginLeft:"-30px",marginTop:"-53px" }}
                    src={logo}
                    alt=""
                  ></img>
               
            </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/admin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              onClick={logoutUserClick}
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="arrow-right">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            @offcial
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  <div  className="col col-9">
    <h3 className="mt-3 font-weight-bold  text-left" >Welcome to Dashboard</h3>
  </div>
  </div>
  </div>
);
}

export default Admin;
