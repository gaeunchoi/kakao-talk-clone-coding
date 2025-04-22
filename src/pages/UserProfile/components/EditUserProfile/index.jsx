import "./style.css";

const EditUserProfile = ({
  name,
  bio,
  onNameChange,
  onBioChange,
  onCancel,
  onSave,
  isSaving,
}) => {
  const user = JSON.parse(localStorage.getItem("loginUser"));
  return (
    <>
      <div className="user-profile">
        <img
          src={user.profile_image_url}
          alt="내 프로필 사진"
          className="profile-img"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="이름"
          className="modify-input"
        />
        <input
          type="text"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="상태메시지"
          className="modify-input"
        />
      </div>
      <div className="user-profile-func">
        <button className="profile-btn" onClick={onCancel} disabled={isSaving}>
          취소
        </button>
        <button className="profile-btn" onClick={onSave} disabled={isSaving}>
          {isSaving ? "저장중 ..." : "프로필 저장"}
        </button>
      </div>
    </>
  );
};

export default EditUserProfile;
