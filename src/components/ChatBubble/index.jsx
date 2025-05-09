import { formatChatTime } from "../../utils/formatChatTime";
import "./style.css";
const ChatBubble = ({ isTarget, senderData, chatData }) => {
  if (isTarget) {
    return (
      <div className="chat-bubble-target">
        <img src={senderData.profile_image_url} alt="상대 프로필 이미지" />
        <div className="chat-bubble-info">
          <p>{senderData.name}</p>
          <div className="chat-bubble-content target-chat-content">
            <p>{chatData.content}</p>
          </div>
        </div>
        <p className="chat-bubble-time">
          {formatChatTime(true, chatData.created_at)}
        </p>
      </div>
    );
  }

  return (
    <div className="chat-bubble-me">
      <p className="chat-bubble-time">
        {formatChatTime(true, chatData.created_at)}
      </p>
      <div className="chat-bubble-content me-chat-content">
        <p>{chatData.content}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
