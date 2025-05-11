import "./style.css";
import "../../styles/transitions.css";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getChatRoomContent,
  getChatRoomsInfo,
  sendChatMessage,
} from "../../apis/chatrooms";
import Modal from "../../components/Modal";
import CustomBtn from "../../components/CustomBtn";
import ChatBubble from "../../components/ChatBubble";
import useLoginUserStore from "../../stores/loginUser";
import SenderSelector from "./components/SenderSelector";

const ChatRoom = () => {
  // ============================ State ============================
  const [target, setTarget] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [senderType, setSenderType] = useState("me");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef(null);
  // ============================ State 끝 ============================

  // ============================ variable ============================
  const { user: loginUser } = useLoginUserStore();
  const { chatroomId } = useParams();
  const navigate = useNavigate();
  // ============================ variable 끝 ============================
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // 채팅방 정보
        const chatInfoData = await getChatRoomsInfo({ chatroomId });
        setTarget(chatroomId === "me" ? loginUser : chatInfoData.other_user);

        // 채팅방 내용
        const chatContentData = await getChatRoomContent({ chatroomId });
        setMessages(chatContentData);
      } catch (e) {
        console.error("🚨 에러 발생", e);
      }
    };
    fetchChatData();
  }, [chatroomId]);

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
      const sendMsgData = await sendChatMessage({
        chatroomId,
        sender_id,
        content: chatMessage,
      });

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
        <Modal message="채팅방 로딩중" />
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
              <div ref={scrollRef} />
            </div>
          </div>
          {target.id !== loginUser.id && (
            <SenderSelector
              senderType={senderType}
              onChange={handleSenderChange}
            />
          )}
          <div className="chat-room-send-text">
            <textarea
              type="text"
              value={chatMessage}
              placeholder="메시지 입력"
              onChange={(e) => {
                setChatMessage(e.target.value);
              }}
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
