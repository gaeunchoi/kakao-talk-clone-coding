import "./UserProfile.css";
import "../../styles/transitions.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const navigate = useNavigate();

  // 나와의 채팅 버튼
  const handleMyChatBtn = () => {
    navigate("/chatlist/me");
  };

  // 프로필 편집 버튼
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const userRes = await fetch(
        "https://goorm-kakaotalk-api.vercel.app/api/users/me",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bio }),
        }
      );

      if (!userRes.ok) throw new Error("프로필 업데이트에 실패했습니다.");
      const userData = await userRes.json();
      localStorage.setItem("loginUser", JSON.stringify(userData));
      setIsEditing(false);
    } catch (e) {
      console.error("🚨 프로필 업데이트 오류:", e);
    }
  };

  return (
    <div className="user-profile-container page-transition">
      <div className="user-profile-header">
        <p onClick={() => navigate(-1)}>← 돌아가기</p>
      </div>
      <div className="user-profile-content">
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
    </div>
  );
};

export default UserProfile;
