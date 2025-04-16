import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/kakaotalk-logo.png";
import { isValidEmail } from "../../utils/emailValidation";
import Modal from "../../components/Modal/Modal";
import "./Login.css";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://goorm-kakaotalk-api.vercel.app/api/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: id,
            password: pw,
          }),
        }
      );

      const data = await res.json();

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

      // 로그인 성공하면 User 정보 받아서 localStorage에 저장
      const userRes = await fetch(
        "https://goorm-kakaotalk-api.vercel.app/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );

      if (!userRes.ok) throw new Error("유저 정보를 불러오지 못했습니다.");
      const userData = await userRes.json();
      localStorage.setItem("loginUser", JSON.stringify(userData));

      setModalMessage("로그인 성공!");
      openModal();
    } catch (e) {
      console.log(e);
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
          onChange={handleIdChanged}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePwChanged}
        />
        <button type="submit" disabled={isBtnDisabled || isLoading}>
          {isLoading ? "로그인 진행중" : "로그인"}
        </button>
        <p onClick={() => navigate("/signup")}>이메일로 회원가입</p>

        {/* ID, PW 필드 에러메시지 */}
        <div className="login-error-message">{errorMessage || "\u00A0"}</div>
      </form>

      {/* 모달 */}
      {isModalOpen && <Modal message={modalMessage} closeFnc={closeModal} />}
    </div>
  );
};

export default Login;
