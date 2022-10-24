
import { useEffect, useState } from "react";
import "./conversation.css";
import { getFriednsConversation} from "../../api/index"
import defaultAvatar from "../../Images/noavator.png"
// spelling is wrong

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
const userImg=conversation.members.find((m)=>m!==currentUser._id)

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await  getFriednsConversation(currentUser._id,friendId);
        console.log("res", res.data)
        setUser(res.data);
        console.log("user",user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);


  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          userImg?.profileImg
            ? userImg?.profileImg
            :  defaultAvatar
        }
        alt=""
      />
      <span className="conversationName">{`${user?.firstname} ${user?.lastname}`}</span>
    </div>
  );
}