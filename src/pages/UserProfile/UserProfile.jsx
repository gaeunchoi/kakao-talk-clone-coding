import "./UserProfile.css";
import "../../styles/transitions.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const navigate = useNavigate();

  // 나와의 채팅 버튼
  const handleMyChatBtn = () => {
    navigate("/mychatroom");
  };

  // 프로필 편집 버튼
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    const updateUser = { ...user, bio };
    localStorage.setItem("loginUser", JSON.stringify(updateUser));
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container page-transition">
      <div className="user-profile">
        <img
          src={user.profile_image_url}
          alt="내 프로필사진"
          className="profile-img"
        />
        <h2>{user.name}</h2>
        {isEditing ? (
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input-bio"
          />
        ) : (
          <p>{user.bio || "상태메시지가 없습니다."}</p>
        )}
      </div>
      <div className="user-profile-func">
        {isEditing ? (
          <>
            <button className="profile-btn" onClick={handleSaveProfile}>
              프로필 저장
            </button>
          </>
        ) : (
          <>
            <button className="profile-btn" onClick={handleMyChatBtn}>
              나와의 채팅
            </button>
            <button className="profile-btn" onClick={handleEditProfile}>
              프로필 편집
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
