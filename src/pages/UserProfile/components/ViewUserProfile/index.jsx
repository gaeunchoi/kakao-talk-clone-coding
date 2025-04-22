import "./style.css";
import { useNavigate } from "react-router-dom";

const ViewUserProfile = ({ user, onEdit }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="user-profile">
        <img
          src={user.profile_image_url}
          alt="내 프로필 사진"
          className="profile-img"
        />
        <h2>{user.name}</h2>
        <p>{user.bio || "상태메시지가 없습니다."}</p>
      </div>
      <div className="user-profile-func">
        <button
          className="profile-btn"
          onClick={() => {
            navigate("/chatlist/me");
          }}
        >
          나와의 채팅
        </button>
        <button className="profile-btn" onClick={onEdit}>
          프로필 편집
        </button>
      </div>
    </>
  );
};

export default ViewUserProfile;
