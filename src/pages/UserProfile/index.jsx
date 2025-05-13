import "./style.css";
import "../../styles/transitions.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { modifyMyInfo } from "../../apis/users";
import EditUserProfile from "./components/EditUserProfileForm";
import ViewUserProfile from "./components/ViewUserProfile";
import useLoginUserStore from "../../stores/loginUser";

const UserProfile = () => {
  // ============================ Hook ============================
  const navigate = useNavigate();
  const { user, setUser } = useLoginUserStore();

  // ============================ State ============================
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // ============================ function ============================
  const handleChange = (key, value) => {
    if (key === "name") setName(value);
    else if (key === "bio") setBio(value);
  };

  const handleCalcel = () => {
    setIsEditing(false);
    setName(user.name || "");
    setBio(user.bio || "");
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const userData = await modifyMyInfo({ name, bio });
      setUser(userData);
      setIsEditing(false);
    } catch (e) {
      console.error("🚨 프로필 업데이트 오류:", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="user-profile-container page-transition">
      <div className="user-profile-header">
        <p onClick={() => navigate(-1)}>← 돌아가기</p>
      </div>
      <div className="user-profile-content">
        {isEditing ? (
          <EditUserProfile
            name={name}
            bio={bio}
            onChange={handleChange}
            onCancel={handleCalcel}
            onSave={handleSaveProfile}
            isSaving={isSaving}
          />
        ) : (
          <ViewUserProfile user={user} onEditClick={() => setIsEditing(true)} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
