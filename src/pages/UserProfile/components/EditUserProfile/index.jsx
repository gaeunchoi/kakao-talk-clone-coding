import "./style.css";
import CustomBtn from "../../../../components/CustomBtn";
import useLoginUserStore from "../../../../stores/loginUser";

const EditUserProfile = ({
  name,
  bio,
  onNameChange,
  onBioChange,
  onCancel,
  onSave,
  isSaving,
}) => {
  const { user } = useLoginUserStore();
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
        <CustomBtn
          className="profile-btn"
          onClick={onCancel}
          disabled={isSaving}
        >
          취소
        </CustomBtn>
        <CustomBtn className="profile-btn" onClick={onSave} disabled={isSaving}>
          {isSaving ? "저장중 ..." : "프로필 저장"}
        </CustomBtn>
      </div>
    </>
  );
};

export default EditUserProfile;
