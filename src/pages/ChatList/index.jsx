import "./style.css";
import "../../styles/transitions.css";
import { useState, useEffect } from "react";
import { getChatRooms } from "../../apis/users";
import Modal from "../../components/Modal";
import PersonalChatList from "./components/PersonalChatList";
import useTokenStore from "../../stores/token";
import useLoginUserStore from "../../stores/loginUser";
import CustomBtn from "../../components/CustomBtn";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  // ============================ State ============================
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // ============================ State 끝 ============================

  // ============================ variable ============================
  const { token, setToken } = useTokenStore();
  const { user, setUser } = useLoginUserStore();
  const navigate = useNavigate();
  // ============================ variable 끝 ============================

  const handleLogoutBtn = () => {
    navigate("/");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await getChatRooms();
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
        <CustomBtn className={"logout-btn"} onClick={handleLogoutBtn}>
          로그아웃
        </CustomBtn>
      </div>
      <div className="chat-list-content">
        <PersonalChatList user={user} />
        {chatRooms.map((chatroom, idx) => (
          <PersonalChatList key={chatroom.id} chatroom={chatroom} idx={idx} />
        ))}
      </div>

      {isLoading && <Modal message="채팅목록 로딩중" />}
    </div>
  );
};

export default ChatList;
