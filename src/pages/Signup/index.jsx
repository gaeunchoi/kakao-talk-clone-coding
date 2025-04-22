import "./style.css";
import logo from "../../assets/kakaotalk-logo.png";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail } from "../../utils/emailValidation";
import { isValidPassword } from "../../utils/pwValidation";
import { signup } from "../../apis/auth";
import Modal from "../../components/Modal";
import SignupInput from "./components/SignupInput";

const Signup = () => {
  // ============================ State ============================
  const [userData, setUserData] = useState({
    id: "",
    pw: "",
    confirmPw: "",
    name: "",
    phoneNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    id: "",
    pw: "",
    confirmPw: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  // ============================ State 끝 ============================
  const navigate = useNavigate();
  // ============================ Modal ============================
  // 모달을 위한 상태감지
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const openSuccessModal = () => {
    setModalState({
      isOpen: true,
      type: "success",
      message: "회원가입이 완료되었습니다!",
    });
  };

  const openErrorModal = (message) => {
    setModalState({
      isOpen: true,
      type: "error",
      message,
    });
  };

  const closeModal = () => {
    const isModalSuccess = modalState.type === "success";
    setModalState({
      isOpen: false,
      type: "",
      message: "",
    });
    if (isModalSuccess) navigate("/");
  };
  // ============================ Modal 끝 ============================
  const checkFormValid = useCallback(() => {
    const { id, pw, confirmPw, name, phoneNumber } = userData;
    const isValid =
      id &&
      pw &&
      confirmPw &&
      name &&
      phoneNumber &&
      !errorMessage.id &&
      !errorMessage.pw &&
      !errorMessage.confirmPw &&
      !errorMessage.phoneNumber;

    setIsFormValid(isValid);
  }, [userData, errorMessage]);

  useEffect(() => {
    checkFormValid();
  }, [userData, errorMessage, checkFormValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));

    if (name === "id") {
      if (!isValidEmail(value)) {
        setErrorMessage((prev) => ({
          ...prev,
          id: "아이디는 이메일 형식으로 입력해야합니다.",
        }));
      } else {
        setErrorMessage((prev) => ({ ...prev, id: "" }));
      }
    }

    if (name === "pw") {
      const pwValidCheck = isValidPassword(value, userData.id);
      setErrorMessage((prev) => ({
        ...prev,
        pw: pwValidCheck.valid ? "" : pwValidCheck.message,
      }));
    }

    if (name === "confirmPw") {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPw:
          value !== userData.pw ? "입력하신 비밀번호와 일치하지 않습니다." : "",
      }));
    }

    if (name === "phoneNumber") {
      const phoneNumberRegex = /^\d{11}$/;
      setErrorMessage((prev) => ({
        ...prev,
        phoneNumber: phoneNumberRegex.test(value)
          ? ""
          : "숫자만 11자리로 입력해주세요.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { res, data } = await signup({
        email: userData.id,
        password: userData.pw,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
      });

      if (!res.ok) {
        openErrorModal(data.message);
        return;
      }

      openSuccessModal();
    } catch (e) {
      console.error("🚨 에러발생: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="title">
        <img src={logo} className="logo" alt="Kakaotalk logo" />
        <p>회원가입</p>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <SignupInput
          label="아이디(E-mail)"
          id="id"
          name="id"
          placeholder="아이디를 이메일 형식으로 입력하세요"
          value={userData.id}
          onChange={handleChange}
          errorMessage={errorMessage.id}
        />

        <SignupInput
          label="비밀번호"
          id="pw"
          name="pw"
          type="password"
          placeholder="비밀번호를 8자 이상 입력하세요"
          value={userData.pw}
          onChange={handleChange}
          errorMessage={errorMessage.pw}
        />

        <SignupInput
          label="비밀번호 확인"
          id="confirmPw"
          name="confirmPw"
          type="password"
          placeholder="위 비밀번호와 동일한 값을 입력하세요"
          value={userData.confirmPw}
          onChange={handleChange}
          errorMessage={errorMessage.confirmPw}
        />

        <SignupInput
          label="이름"
          id="name"
          name="name"
          placeholder="이름을 입력하세요"
          value={userData.name}
          onChange={handleChange}
        />

        <SignupInput
          label="휴대전화번호"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="휴대전화번호를 입력하세요(- 제외)"
          value={userData.phoneNumber}
          maxLength={11}
          onChange={handleChange}
          errorMessage={errorMessage.phoneNumber}
        />

        <div className="signup-form-field">
          <button type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "회원가입 진행중" : "회원가입 완료"}
          </button>
        </div>
        <div className="signup-form-field">
          <Link to="/" className="login-link">
            로그인 화면으로 돌아가기
          </Link>
        </div>
      </form>

      {/* Modal */}
      {modalState.isOpen &&
        createPortal(
          <Modal
            message={modalState.message}
            closeFnc={closeModal}
            showBtn={true}
          />,
          document.body
        )}
    </div>
  );
};

export default Signup;
