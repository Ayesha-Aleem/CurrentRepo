import { useEffect, useState } from "react";
import "./conversation.css";
import { getFriednsConversation } from "../../api/index";
import defaultAvatar from "../../Images/noavator.png";

export default function Conversation({ profileImg,conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const userImg = conversation.members.find((m) => {
    return m._id !== currentUser._id;
  });

  useEffect(() => {
    setUser(conversation?.members.find(member=>{
      return member._id!==currentUser?._id
    }))
  
  }, [conversation])
  

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={userImg?.profileImg ? userImg?.profileImg : defaultAvatar}
        alt=""
      />
      <span className="conversationName">{`${user?.firstname} ${user?.lastname}`}</span>
    </div>
  );
}
