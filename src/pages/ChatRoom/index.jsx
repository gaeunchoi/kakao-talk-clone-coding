import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import "../../styles/transitions.css";
import Modal from "../../components/Modal";
import ChatBubble from "../../components/ChatBubble";
import { getChatRoomContent, getChatRoomsInfo } from "../../apis/chatrooms";
import CustomBtn from "../../components/CustomBtn";

const ChatRoom = () => {
  // ============================ State ============================
  const [target, setTarget] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [senderType, setSenderType] = useState("me");
  const [isSending, setIsSending] = useState(false);
  // ============================ State 끝 ============================

  // ============================ variable ============================
  const loginUser = JSON.parse(localStorage.getItem("loginUser")) ?? null;
  const token = localStorage.getItem("token");
  const { chatroomId } = useParams();
  const navigate = useNavigate();
  // ============================ variable 끝 ============================

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // 채팅방 정보
        const chatInfoData = await getChatRoomsInfo({ chatroomId, token });
        setTarget(chatroomId === "me" ? loginUser : chatInfoData.other_user);

        // 채팅방 내용
        const chatContentData = await getChatRoomContent({ chatroomId, token });
        setMessages(chatContentData);
      } catch (e) {
        console.error("🚨 에러 발생", e);
      }
    };
    fetchChatData();
  }, [chatroomId, token]);

  // 채팅창 입력 감지
  const handleTextarea = (e) => {
    setChatMessage(e.target.value);
  };

  // radio 감지
  const handleSenderChange = (e) => {
    setSenderType(e.target.value);
  };

  // 전송 버튼
  const handleSendMessageBtn = async () => {
    if (!chatMessage.trim()) return;
    if (isSending) return;

    const sender_id = senderType === "me" ? loginUser.id : target.id;

    try {
      setIsSending(true);
      const sendMsgRes = await fetch(
        `https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}/chats`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sender_id,
            content: chatMessage,
          }),
        }
      );

      if (!sendMsgRes.ok) throw new Error("메시지가 전송되지 않았습니다.");

      const sendMsgData = await sendMsgRes.json();
      setMessages((prev) => [...prev, sendMsgData]);
      setChatMessage("");
    } catch (e) {
      console.error("🚨 에러 발생", e);
    } finally {
      setIsSending(false);
    }
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
            <CustomBtn
              className="go-chat-list-btn"
              onClick={() => {
                navigate("/chatlist");
              }}
            >
              채팅 목록
            </CustomBtn>
          </div>
          <div className="chat-room-content-wrapper">
            <div className="chat-room-content">
              <div style={{ marginTop: "auto" }} />
              {messages.map((message) => {
                const isMe = message.sender_id === loginUser.id;
                return (
                  <ChatBubble
                    key={message.id}
                    isTarget={!isMe}
                    senderData={isMe ? loginUser : target}
                    chatData={message}
                  />
                );
              })}
            </div>
          </div>
          {target.id !== loginUser.id && (
            <div className="who-send-chat">
              <form>
                <label>
                  <input
                    type="radio"
                    name="sender"
                    value="me"
                    checked={senderType === "me"}
                    onChange={handleSenderChange}
                  />
                  나
                </label>
                <label>
                  <input
                    type="radio"
                    name="sender"
                    value="target"
                    checked={senderType === "target"}
                    onChange={handleSenderChange}
                  />
                  상대방
                </label>
              </form>
            </div>
          )}
          <div className="chat-room-send-text">
            <textarea
              type="text"
              value={chatMessage}
              placeholder="메시지 입력"
              onChange={handleTextarea}
            />
            <CustomBtn
              className="chat-room-send-btn"
              disabled={!chatMessage || isSending}
              onClick={handleSendMessageBtn}
            >
              {isSending ? "전송중 .." : "전송"}
            </CustomBtn>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
