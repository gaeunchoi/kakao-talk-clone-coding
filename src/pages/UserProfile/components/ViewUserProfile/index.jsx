import "./style.css";
import CustomBtn from "../../../../components/CustomBtn";
import { useNavigate } from "react-router-dom";

const ViewUserProfile = ({ user, onEditClick }) => {
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
        <CustomBtn
          className="profile-btn"
          onClick={() => {
            navigate("/chatlist/me");
          }}
        >
          나와의 채팅
        </CustomBtn>
        <CustomBtn className="profile-btn" onClick={onEditClick}>
          프로필 편집
        </CustomBtn>
      </div>
    </>
  );
};

export default ViewUserProfile;
