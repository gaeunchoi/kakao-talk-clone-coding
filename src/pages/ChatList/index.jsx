import "./style.css";
import "../../styles/transitions.css";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { formatChatTime } from "../../utils/formatChatTime";
import { useNavigate } from "react-router-dom";
import { getChatRooms } from "../../apis/users";
const ChatList = () => {
  // ============================ State ============================
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // ============================ State 끝 ============================

  // ============================ variable ============================
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const navigate = useNavigate();
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
        <div className="profile-container">
          <img
            src={user.profile_image_url}
            alt="내 프로필 이미지"
            className="profileImg"
            onClick={() => navigate("/userprofile")}
          />
          <div className="profileText">
            <h3>{user.name}</h3>
            <p>{user.bio || "상태메시지가 없습니다."}</p>
          </div>
          <button
            className="my-chat-room-btn"
            onClick={() => {
              navigate("/chatlist/me");
            }}
          >
            나와의 채팅
          </button>
        </div>
        <div className="chat-rooms">
          {chatRooms.map((chatroom, idx) => (
            <div
              key={idx}
              className="profile-container"
              onDoubleClick={() => {
                navigate(`/chatlist/${chatroom.id}`);
              }}
            >
              <img
                src={chatroom.other_user.profile_image_url}
                alt="profileImg"
                className="profileImg"
              />
              <div className="profileText">
                <h3>{chatroom.other_user.name}</h3>
                <p>
                  {chatroom.last_message?.content ||
                    "이전 대화 내용이 존재하지 않습니다."}
                </p>
              </div>
              <span className="last-chat-time">
                {chatroom.last_message
                  ? formatChatTime(false, chatroom.last_message.updated_at)
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
      {isLoading && (
        <Modal message="채팅목록 로딩중" closeFnc={() => {}} showBtn={false} />
      )}
    </div>
  );
};

export default ChatList;
