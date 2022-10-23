
import { useEffect, useState } from "react";
import "./conversation.css";
import {getMessage} from "../../api/index"
import defaultAvatar from "../../Images/noavator.png"
// spelling is wrong

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = "";

  // useEffect(() => {
  //   const friendId = conversation.members.find((m) => m !== currentUser._id);

  //   const getUser = async () => {
  //     try {
  //       const res = await getMessage(friendId);
  //       console.log("res", res.data)
  //       setUser(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUser();
  // }, [currentUser, conversation]);


  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          currentUser?.profileImg
            ? currentUser.profileImg
            :  defaultAvatar
        }
        alt=""
      />
      <span className="conversationName">{`${currentUser?.firstname} ${currentUser?.lastname}`}</span>
    </div>
  );
}