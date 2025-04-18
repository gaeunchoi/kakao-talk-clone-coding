import "./style.css";
import logo from "../../assets/kakaotalk-logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/emailValidation";
import Modal from "../../components/Modal";
import { login } from "../../apis/auth";
import { getMyInfo } from "../../apis/users";

const Login = () => {
  // ============================ State ============================
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // ============================ State 끝 ============================

  const navigate = useNavigate();

  // ============================ Modal ============================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    if (modalMessage === "로그인 성공!") navigate("/chatlist");
  };
  // ============================ Modal 끝 ============================

  // ID 이메일 형식 체크
  useEffect(() => {
    if (id && !isValidEmail(id))
      setErrorMessage("아이디는 이메일 형식으로 입력해야합니다.");
    else setErrorMessage("");
  }, [id]);

  // 로그인 버튼 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 로그인 시도
      const { res, data } = await login({ email: id, password: pw });

      if (!res.ok) {
        if (data.message.includes("비밀번호")) {
          setErrorMessage(data.message);
        } else {
          setModalMessage(data.message);
          openModal();
        }
        return;
      }
      localStorage.setItem("token", data.accessToken);

      // 로그인 성공하면 내 정보 가져오기
      const userData = await getMyInfo({ token: data.accessToken });
      localStorage.setItem("loginUser", JSON.stringify(userData));

      setModalMessage("로그인 성공!");
      openModal();
    } catch (e) {
      console.log("🚨 에러 발생: ", e);
      setModalMessage("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      openModal();
    } finally {
      setIsLoading(false);
    }
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
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button type="submit" disabled={isBtnDisabled || isLoading}>
          {isLoading ? "로그인 진행중" : "로그인"}
        </button>
        <Link to="/signup" className="signup-link">
          이메일로 회원가입
        </Link>

        {/* ID, PW 필드 에러메시지 */}
        <div className="login-error-message">{errorMessage || "\u00A0"}</div>
      </form>

      {/* 모달 */}
      {isModalOpen && <Modal message={modalMessage} closeFnc={closeModal} />}
    </div>
  );
};

export default Login;
