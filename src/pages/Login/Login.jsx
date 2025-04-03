import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/kakaotalk-logo.png";
import { isValidEmail } from "../../utils/emailValidation";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Modal 설정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "로그인 성공!") navigate("/chatlist");
  };

  const handleIdChanged = (e) => {
    setId(e.target.value);
  };

  const handlePwChanged = (e) => {
    setPw(e.target.value);
  };

  // ID 이메일 형식 체크
  useEffect(() => {
    if (id && !isValidEmail(id))
      setErrorMessage("아이디는 이메일 형식으로 입력해야합니다.");
    else setErrorMessage("");
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 로그인 성공시 Modal
    if (id === "admin@test.com" && pw === "admin") {
      setModalMessage("로그인 성공!");
    } else {
      setModalMessage("로그인 정보가 올바르지 않습니다");
    }
    openModal();
  };

  const isBtnDisabled = id === "" || pw === "" || !isValidEmail(id);

  return (
    <div className="login-container">
      <img src={logo} className="logo" alt="Kakaotalk Logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디(E-mail)"
          value={id}
          onChange={handleIdChanged}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePwChanged}
        />
        <button type="submit" disabled={isBtnDisabled}>
          로그인
        </button>
        <p onClick={() => navigate("/Signup")}>이메일로 회원가입</p>
        {errorMessage && (
          <div className="login-error-message">{errorMessage}</div>
        )}
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
