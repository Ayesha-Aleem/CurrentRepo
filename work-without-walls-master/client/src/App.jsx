import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useRef } from "react";

//Components
import Admin from "./Components/admin/Admin";
import BuyerProfile from "./Components/BuyerProfile";
import Home from "./Components/Home";
import Login from "./Components/login";
import PostYourGIG from "./Components/PostYourGIG";
import ProfileUser from "./Components/ProfileUser";
import Register from "./Components/register";
import Profile from "./Components/UserNavbar";
import Analytics from "./Components/analytics/Analytics"
import ResetPassword from "./Components/ForgetAndRest/ResetPassowrd";
import ForgetPassword from './Components/ForgetAndRest/ForgetPassword';
// Team
import { Route, Routes } from "react-router-dom";
import Bid from "./Components/Bid/Bid";
import BuyerTeamCategory from "./Components/BuyerTeamCategory";
import { ForgotPasswordPage } from "./Components/forgot-password";
import Messenger from "./Components/Messenger/Messenger";
import { ProtectedRoute } from "./Components/protected-route";
import ActiveOrders from "./Components/ShowBuyerRequest/ActiveOrders";
import BuyerReq from "./Components/ShowBuyerRequest/BuyerReq";
import Catagory from "./Components/Teams/Catagory";
import CreateTeam from "./Components/Teams/CreateTeam";
import Members from "./Components/Teams/Members";
import TeamTitle from "./Components/Teams/TeamTitle";
import { UserContext } from "./context/user.context";
import Firstteam from "./Components/TeamBuyerEnd/Firstteam"
import Second from "./Components/TeamBuyerEnd/SecondScreen"
import SellerTeam from "./Components/Teams-At-Seller-End/SellerTeam"
import Setting from "./Components/setting/Setting"
import SettingB from "./Components/setting/SettingB"
function App() {

  return (
    <Routes>
      <>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
         <Route path="/ResetPassword/:resetLink" element={<ResetPassword />} />
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
          <Route path="/first" element={< Firstteam />} />
          <Route path="/second" element={<Second />} />
          <Route path="/sellerTeam" element={<SellerTeam />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/setting" element={<Setting/>}/>
          <Route path="/settingb" element={<SettingB/>}/>
        </Route>
      </>
    </Routes>
  );
}

export default App;
