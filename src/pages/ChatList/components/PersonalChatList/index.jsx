import "./style.css";
import { useNavigate } from "react-router-dom";
import { formatChatTime } from "../../../../utils/formatChatTime";
import CustomBtn from "../../../../components/CustomBtn";

const PersonalChatList = ({ chatroom = null, idx = null, user = null }) => {
  const navigate = useNavigate();

  return user ? (
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
      <CustomBtn
        className="my-chat-room-btn"
        onClick={() => {
          navigate("/chatlist/me");
        }}
      >
        나와의 채팅
      </CustomBtn>
    </div>
  ) : (
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
  );
};

export default PersonalChatList;
