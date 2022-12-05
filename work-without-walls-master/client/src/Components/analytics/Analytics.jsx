import React,{ useState, useEffect } from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
  } from 'cdbreact';
  import axios from 'axios';
  import { NavLink } from 'react-router-dom';
  import logo from "../../Images/logo.png";
 import {Line} from "react-chartjs-2"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import  { logoutUser } from "../../api";
const Analytics = () => {
    const navigate = useNavigate();
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
    const [chartData,setChartData]=useState({})
  useEffect((()=>{
    let emprate=[];
    let empname=[];
    axios.get("/api/").then((res)=>{
    for(const dataObj of res.data){
      emprate.push(parseInt(dataObj.rate))
      empname.push(`${dataObj.firstname}  ${dataObj.lastname}` )
    }
    setChartData({
  
      labels:empname,
      datasets:[
        {
          label:"Chart according to rating",
          data:emprate,
          backgroundColor:["rgba(75,192,192,0.6)"],
          borderwidth:4,
        }
      ]
    })
  }
    
    ).
    catch((e)=>console.log(e))
    console.log(emprate,empname)
  }),[])
  console.log(chartData)
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
            <NavLink exact to="/admin" className="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" className="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              onClick={logoutUserClick}
              target="_blank"
              className="activeClicked"
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
        <div className=" col col-9 " >
        <h1 className="h3 mt-3 mb-2 text-gray-800">Analytics</h1>
        <div className="row">
            <div className="col-xl-8 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Area Chart</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                       <Line
          data={chartData}
          options={{
            responsive: true,
            title: { text: "THICCNESS SCALE", display: true },
            // scales: {
            //   yAxes: [
            //     {
            //       ticks: {
            //         autoSkip: true,
            //         maxTicksLimit: 10,
            //         beginAtZero: true
            //       },
            //       gridLines: {
            //         display: false
            //       }
            //     }
            //   ],
            //   xAxes: [
            //     {
            //       gridLines: {
            //         display: false
            //       }
            //     }
            //   ]
            // }
          }}
        />
                        </div>
                        <hr/>
                       
                    </div>
                </div>

          
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Bar Chart</h6>
                    </div>
                    <div className="card-body">
                        <div className="chart-bar">
                            <canvas id="myBarChart"></canvas>
                        </div>
                        <hr/>
                        
                    </div>
                </div>

            </div>

        </div>
        </div>
    </div>
    </div>
    );
}
 
export default Analytics;