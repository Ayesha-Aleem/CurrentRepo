import axios from "axios";

const Base = axios.create({
  baseURL: "http://localhost:7900",
  headers: {
    "Content-Type": "application/json",
  },
});

Base.interceptors.request.use((config) => {
  const user = window?.localStorage?.getItem("user");
  if (user) {
    const userDetail = JSON.parse(user);
    config.headers["Authorization"] = `Bearer ${userDetail?.token}`;
  }
  return config;
});

export const loginUser = (data) => Base.post("/auth/login", data);
export const logoutUser = () => Base.post("/auth/logout");
export const signupUser = (data) => Base.post("/api/register", data);
export const getUserMe = () => Base.get("/api/user");
export const getJobs = () => Base.get("/Job/") 
export const createJob=(data)=>Base.post(`/Job/create/`, data)
export const getYourJobs = ()=>Base.get("/Job/yourJob") //being map
export const updateYourJobs = (id, data)=>Base.put(`/Job/updateJob/${id}`, data) //being updated
export const deleteYourJobs = (id)=>Base.delete(`/Job/delete/${id}`) //being deleted
export const updateProfile=(id, data)=>Base.put(`/api/profile/${id}`,data)//being updated
export const rpass=(values)=>Base.put("/pass/reset-password",values);
export const getConversation=(id)=>Base.get(`/api/conversations/${id}`)  //done
export const getMessage=(id)=>Base.get(`/api/messages/${id}`)//done
export const AddMessages=()=>Base.post("/api/messages")
export const getFriednsConversation=(senderId,receiverId)=>Base.get(`/api/conversations/find/${senderId}/${receiverId}`) //chat online




