import "./ChatList.css";
import "../../styles/transitions.css";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";
const ChatList = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const chatRoomRes = await fetch(
          "https://goorm-kakaotalk-api.vercel.app/api/users/me/chatrooms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!chatRoomRes.ok) throw new Error("채팅방을 불러오지 못했습니다.");

        const chatRoomData = await chatRoomRes.json();
        setChatRooms(chatRoomData);
      } catch (e) {
        console.error("🚨 에러 발생->", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAPI();
  }, [token]);

  const handleUserProfileImg = () => {
    navigate("/userprofile");
  };

  return (
    <div className="chat-list-container page-transiton">
      <div className="chat-list-title">
        <h2>💬 {user.name}님의 ChatList</h2>
      </div>
      <div className="chat-list-content">
        <div className="profile-container">
          <img
            src={user.profile_image_url}
            alt="내 프로필 이미지"
            className="profileImg"
            onClick={handleUserProfileImg}
          />
          <div className="profileText">
            <h3>{user.name}</h3>
            <p>{user.bio || "상태메시지가 없습니다."}</p>
          </div>
          <button className="my-chat-room-btn">나와의 채팅</button>
        </div>
        <div className="chat-rooms">
          {chatRooms.map((chatroom, idx) => (
            <div key={idx} className="profile-container">
              <img
                src={chatroom.other_user.profile_image_url}
                alt="profileImg"
                className="profileImg"
              />
              <div className="profileText">
                <h3>{chatroom.other_user.name}</h3>
                <p>
                  {chatroom.last_message.content ||
                    "이전 대화 내용이 존재하지 않습니다."}
                </p>
              </div>
              <span className="last-chat-time">
                {new Date(chatroom.last_message.updated_at).toLocaleTimeString(
                  "ko-KR",
                  { hour: "2-digit", minute: "2-digit" }
                )}
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
