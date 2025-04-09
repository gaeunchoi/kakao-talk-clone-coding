import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatRoom.css";
import "../../styles/transitions.css";
import Modal from "../../components/Modal";

const ChatRoom = () => {
  // ============================ State ============================
  const [target, setTarget] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  // ============================ State 끝 ============================

  // ============================ variable ============================
  const token = localStorage.getItem("token");
  const { chatroomId } = useParams();
  const navigate = useNavigate();
  // ============================ variable 끝 ============================

  useEffect(() => {
    const fetchChatData = async () => {
      const loginUser = JSON.parse(localStorage.getItem("loginUser"));
      if (chatroomId === "me") setTarget(loginUser);
      else {
        try {
          // 채팅방 정보
          const chatInfoRes = await fetch(
            `https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!chatInfoRes.ok)
            throw new Error("채팅방 정보를 불러오지 못했습니다.");
          const chatInfoData = await chatInfoRes.json();
          setTarget(chatInfoData.other_user);

          // 채팅방 내용
          const chatContentRes = await fetch(
            `https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}/chats`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!chatContentRes.ok)
            throw new Error("채팅방 내용을 불러오지 못했습니다.");
          const chatContentData = await chatContentRes.json();
          setMessages(chatContentData);
        } catch (e) {
          console.error("🚨 에러 발생", e);
        }
      }
    };

    fetchChatData();
  }, [chatroomId, token]);

  const handleTextarea = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div className="chat-room-container page-transition">
      {!target ? (
        <Modal message="채팅방 로딩중" closeFnc={() => {}} showBtn={false} />
      ) : (
        <>
          <div className="chat-room-header">
            <img src={target.profile_image_url} alt="프로필사진" />
            <h2>{target.name}</h2>
            <button
              className="go-chat-list-btn"
              onClick={() => {
                navigate("/chatlist");
              }}
            >
              채팅 목록
            </button>
          </div>
          <div className="chat-room-content">
            <h1>채팅 들어갈겁니당</h1>
          </div>
          <div className="chat-room-send-text">
            <textarea
              type="text"
              placeholder="메시지 입력"
              onChange={handleTextarea}
            />
            <button className="chat-room-send-btn" disabled={!chatMessage}>
              전송
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
