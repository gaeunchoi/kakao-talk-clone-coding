import React from "react";

const SignupInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  maxLength = null,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="signup-form-field">
      <div className="info">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
        />
      </div>
      <div className="signup-error-message">{errorMessage || "\u00A0"}</div>
    </div>
  );
};

export default SignupInput;
