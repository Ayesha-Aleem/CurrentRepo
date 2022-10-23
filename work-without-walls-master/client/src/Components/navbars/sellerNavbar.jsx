import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/logo.png";
import {
  BsChatTextFill,
  BsFillBellFill,
  BsFillPeopleFill,
  BsGearWide,
  BsLock,
  BsPersonFill,

} from "react-icons/bs";
import {MdOutlineCreateNewFolder} from "react-icons/md"
import {FcSettings} from "react-icons/fc"
import { Dropdown, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { logoutUser } from "../../api";
import "./sellerNavbar.css"
const SellerNavBar = () => {
  const navigate = useNavigate();
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

  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="logo">
          <img
             className="pic"
              src={logo}
              alt=""
            ></img></span>
      </Link>
    </div>
    <div className="topbarRight">
      <div className="topbarIcons">
          <div className="topbarIconItem">
              <Link
                className="text-light"
                aria-current="page"
                to="/"
               
              >
                Order
              </Link>
        </div>
        <div className="topbarIconItem">
              <Link className="text-light"  to="/">
                <BsFillBellFill />
              </Link>
              <span className="topbarIconBadge"></span>
        </div>
        <div className="topbarIconItem">
              <Link className=" text-light" to="/messages">
                <BsChatTextFill />
              </Link>
          <span className="topbarIconBadge"></span>
        </div>
        <div className="topbarIconItem">
              <Link className=" text-light"  to="/catagory">
                <BsFillPeopleFill />
              </Link>
          <span className="topbarIconBadge"></span>
        </div>
      </div>
    </div>
  <div className="topbarsecondLast">
            <Link className="text-light" to="/buyerProfile" >
              Switch to Buyer
            </Link>
  </div>
    <div className="topbarend">
            
            <div className="text-light">
            <NavDropdown >
              <Dropdown.Item
                to="/profile"
                onClick={() => {
                  navigate("/buyer-request");
                }}
              >
                Buyer Request
              </Dropdown.Item>
              <Dropdown.Item
                to="/profile"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <BsPersonFill className="mx-2" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item to="/" >
                <BsGearWide className="mx-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item  onClick={() => {
                  navigate("/createTeam");
                }}>
                <MdOutlineCreateNewFolder className="mx-2" />
                create team
              </Dropdown.Item>
              <Dropdown.Item to="/" onClick={logoutUserClick}>
                <BsLock className="mx-2" />
                Logout
              </Dropdown.Item>
            </NavDropdown>
          </div>
    </div>
  </div>
  );
};

export default SellerNavBar;
