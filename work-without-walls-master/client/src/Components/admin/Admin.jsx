import React, { useState, useEffect } from "react";
import "./screen.css"
import logo from "../../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import  { logoutUser } from "../../api";
import "../navbars/sellerNavbar.css"
import Dropdown from 'react-bootstrap/Dropdown';
import { HiFilter } from 'react-icons/hi'
import Pagination from "../pagination/Pagination"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
const Admin = () => {
  const navigate = useNavigate();
  const [currentBtnState, setcurrentBtnState] = useState(false);
  const { setuser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);
const[posts,setPosts]=useState([]);
const[posts2,setPosts2]=useState([]);
const[loading,setLoading]=useState(false)

const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts2.slice(firstPostIndex, lastPostIndex);
console.log(currentPosts)
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
 //done
 const getP=()=>{ axios.get("/PSFS/sorting").then((res) => {
  setPosts2(res.data);
})
.catch((err) => console.log(err))
 }

 
  const loadpost=async()=>{
    const response=await axios.get("/api/");
    setPosts(response.data);
    setLoading(false);
  }
 
useEffect((()=>{loadpost()}),[])

  const approveUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: true })
      .then((res) => {
        console.log(res.data);
        window?.location?.reload();
      })
      .catch((err) => console.log(err));
  };
  const disapproveUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: false })
      .then((res) => {
        console.log(res.data);
        window?.location?.reload()
      })
      .catch((err) => console.log(err));
  };

  const blockUser = (id) => {
    axios
      .put(`/admin/approve-user/${id}`, { approve: false })
      .then((res) => {
        console.log(res.data);
        window?.location?.reload()
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    axios
      .delete(`/admin/delete-user/${id}`)
      .then((res) => {
        console.log(res.data);
        window?.location?.reload()
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
  <div  className="col col-md-9">
      <h1  className="d-flex justify-content-start">Welcome to Dashboard</h1>
      <br/>
      <div className="row" style={{width:"140%"}}>
        <div className="col-12">
          <div className="row d-flex justify-content-end">
            <div className="col col-md-6 d-flex justify-content-end">
              <input  
              className="nosubmit"
              type="text" 
              placeholder="Search..." 
              onChange={(e)=>{
                setPosts2( posts.filter(param=>param.email.toLowerCase().includes(e.target.value))) 
            }} 
              />

              {loading? (<h4>Loading...</h4>):
              (posts2.map((item)=>{
              <div className="col col-md-12 my-4  content ">
                <div className="row row-md-12 ">
              <div className="col-md-6" >
                <div className="my-3 row">
                  <div className="col-md-4 d-flex justify-content-end fw-bold">Name</div>
                  <div className="col-md-6"><p className='inppppp' type="text" >{item.firstname}{" "}
                    {item.lastname}</p></div>
                </div>
                <div className="my-3 row">
                  <div className="col-md-4 d-flex justify-content-end fw-bold">Email</div>
                  <div className="col-md-6"><p className='inppppp' type="text" >{item.email}</p></div>
                </div>
                <div className="my-3 row">
                  <div className="col-md-4 d-flex justify-content-end fw-bold">Phone</div>
                  <div className="col-md-6"><p className='inppppp' type="text">{item.phone}</p> </div>
                </div>
                <div className="my-3 row">
                  <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Number</div>
                  <div className="col-md-6"><p className='inppppp' type="text">{item["CNIC"]}</p></div>
                </div>
                <div className="my-3 row">
                  <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Front</div>
                  <div className="col-md-6"><p className='inpppppu' type="text"> <a href={item["cnicFront"]}>{item["cnicFront"]}</a></p> </div>
                </div>
                <div className="my-3 row">
                  <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Back</div>
                  <div className="col-md-6"><p className='inpppppu' type="text"> <a href={item["cnicBack"]}>{item["cnicFront"]}</a></p></div>
                </div>
                
              </div>
              <div className="col-md-3" ></div>
              <div className="col-md-3">
               
                <button
                      className={'butnn'}
                onClick={() => {
                          approveUser(item._id);
                          setcurrentBtnState(true);
                          console.log(item._id, item.approve);
                        }} style={{background:"#025EE5"} }>
                          Approve
                </button>
                <button className='butnn '  
                onClick={() => disapproveUser(item._id)} 
                style={{background:"#FE7676"}}>
                  Dennied
                  </button>
                <button className='butnn' 
                 onClick={() => deleteUser(item._id)} 
                 style={{background:"black"}}>
                  Block
                  </button>
                <button className='butnn' 
                onClick={() => blockUser(item._id)} 
                style={{background:"#FE0000"}}>
                  Delete
                  </button>
              </div>
              
              </div>
            </div>}))}

            </div>
            <div className="d-flex justify-content-end col col-md-6">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className='filterBtn px-3'>
                  <HiFilter size={16}  />
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={getP}>Not approve</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {currentPosts.map((user) => (
          <div className="col col-md-12 my-4  content ">
            <div className="row row-md-12 ">
            <div className="col-md-6" >
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">Name</div>
                <div className="col-md-6"><p className='inppppp' type="text" >{user.firstname}{" "}
                  {user.lastname}</p></div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">Email</div>
                <div className="col-md-6"><p className='inppppp' type="text" >{user.email}</p></div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">Phone</div>
                <div className="col-md-6"><p className='inppppp' type="text">{user.phone}</p> </div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Number</div>
                <div className="col-md-6"><p className='inppppp' type="text">{user["CNIC"]}</p></div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Front</div>
                <div className="col-md-6"><p className='inpppppu' type="text"> <a href={user["cnicFront"]}>{user["cnicFront"]}</a></p> </div>
              </div>
              <div className="my-3 row">
                <div className="col-md-4 d-flex justify-content-end fw-bold">CINIC Back</div>
                <div className="col-md-6"><p className='inpppppu' type="text"> <a href={user["cnicBack"]}>{user["cnicFront"]}</a></p></div>
              </div>
              
            </div>
            <div className="col-md-3" ></div>
            <div className="col-md-3">
             
              <button
                    className={'butnn'}
              onClick={() => {
                        approveUser(user._id);
                        setcurrentBtnState(true);
                        console.log(user._id, user.approve);
                      }} style={{background:"#025EE5"}}>
                        Approve
              </button>
              <button className='butnn '  
              onClick={() => disapproveUser(user._id)} 
              style={{background:"#FE7676"}}>
                Dennied
                </button>
              <button className='butnn' 
               onClick={() => deleteUser(user._id)} 
               style={{background:"black"}}>
                Block
                </button>
              <button className='butnn' 
              onClick={() => blockUser(user._id)} 
              style={{background:"#FE0000"}}>
                Delete
                </button>
            </div>
            
            </div>
          </div>
          ))}
        </div>
      </div>
          <Pagination
                totalPosts={posts2.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
  </div>
  </div>
  </div>
);
}

export default Admin;
