// 이메일 유효성 검사
export const isValidEmail = (email) => {
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-z]{2,}$/i;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
export const isValidPassword = (pw, id) => {
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const minLength = 8;

  if (pw.length < minLength || !specialCharRegex.test(pw)) {
    return {
      valid: false,
      message: "비밀번호는 8자 이상이며, 특수문자를 포함해야합니다.",
    };
  }

  for (let i = 0; i <= id.length - 4; i++) {
    const substring = id.slice(i, i + 4);
    if (pw.includes(substring)) {
      return {
        valid: false,
        message: "아이디와 4글자 이상 연속된 부분이 포함되어 있습니다.",
      };
    }
  }

  return { valid: true, message: "" };
};
