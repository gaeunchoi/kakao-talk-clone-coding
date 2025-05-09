import "./style.css";
import "../../styles/transitions.css";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getChatRooms } from "../../apis/users";
import Modal from "../../components/Modal";
import PersonalChatList from "./components/PersonalChatList";
import useTokenStore from "../../stores/token";

const ChatList = () => {
  // ============================ State ============================
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // ============================ State 끝 ============================

  // ============================ variable ============================
  const { token } = useTokenStore();
  const user = JSON.parse(localStorage.getItem("loginUser"));
  // ============================ variable 끝 ============================

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await getChatRooms({ token: token });
        setChatRooms(data);
      } catch (e) {
        console.error("🚨 에러 발생: ", e);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  return (
    <div className="chat-list-container page-transition">
      <div className="chat-list-title">
        <h2>💬 {user.name}님의 ChatList</h2>
      </div>
      <div className="chat-list-content">
        <PersonalChatList user={user} />
        {chatRooms.map((chatroom, idx) => (
          <PersonalChatList key={chatroom.id} chatroom={chatroom} idx={idx} />
        ))}
      </div>

      {isLoading &&
        createPortal(
          <Modal
            message="채팅목록 로딩중"
            closeFnc={() => {}}
            showBtn={false}
          />,
          document.body
        )}
    </div>
  );
};

export default ChatList;
