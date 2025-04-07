import React from "react";

const SignupInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
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
          onChange={onChange}
        />
      </div>
      {errorMessage && (
        <div className="signup-error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default SignupInput;
