import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Home from "./Components/Home";
import Register from "./Components/register";
import Login from "./Components/login";
import Profile from "./Components/UserNavbar";
import Admin from "./Components/Admin";
import BuyerProfile from "./Components/BuyerProfile";
import ProfileUser from "./Components/ProfileUser";
import PostYourGIG from "./Components/PostYourGIG";

// Team
import CreateTeam from "./Components/Teams/CreateTeam";
import Catagory from "./Components/Teams/Catagory";
import TeamTitle from "./Components/Teams/TeamTitle";
import Members from "./Components/Teams/Members";
import BuyerTeamCategory from "./Components/BuyerTeamCategory";
import { Route, Routes } from "react-router-dom";
import { ForgotPasswordPage } from "./Components/forgot-password";
import { ProtectedRoute } from "./Components/protected-route";
import { UserProvider } from "./context/user.context";
import Bid from "./Components/Bid/Bid";
import BuyerReq from "./Components/ShowBuyerRequest/BuyerReq";
import ActiveOrders from "./Components/ShowBuyerRequest/ActiveOrders"
import Messenger from "./Components/Messenger/Messenger"
function App() {
  return (
    <UserProvider>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/buyerProfile" element={<BuyerProfile />} />
            <Route path="/profileUser" element={<ProfileUser />} />
            <Route path="/profile/profileUser" element={<ProfileUser />} />
            <Route path="/PostYourGIG" element={<PostYourGIG />} />
            <Route path="/createTeam" element={<CreateTeam />} />
            <Route path="/catagory" element={<Catagory />} />
            <Route path="/teamTitle" element={<TeamTitle />} />
            <Route path="/members" element={<Members />} />
            <Route path="/BuyerTeamCategory" element={<BuyerTeamCategory />} />
            <Route path="/bid" element={<Bid />} />
            <Route path="/buyer-request" element={<BuyerReq />} />
            <Route path="/active-orders" element={<ActiveOrders />} />
            <Route path="/messages" element={<Messenger />} />
          </Route> 

        </>
      </Routes>
    </UserProvider>
  );
}

export default App;
