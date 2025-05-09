import "./style.css";
import "../../styles/transitions.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { modifyMyInfo } from "../../apis/users";
import EditUserProfile from "./components/EditUserProfile";
import ViewUserProfile from "./components/ViewUserProfile";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loginUser"))
  );
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleCalcel = () => {
    setIsEditing(false);
    setName(user.name || "");
    setBio(user.bio || "");
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const userData = await modifyMyInfo({ name, bio, token });
      localStorage.setItem("loginUser", JSON.stringify(userData));
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
            onNameChange={setName}
            onBioChange={setBio}
            onCancel={handleCalcel}
            onSave={handleSaveProfile}
            isSaving={isSaving}
          />
        ) : (
          <ViewUserProfile user={user} onEdit={() => setIsEditing(true)} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
