import "./style.css";

const CustomBtn = ({ type = "", className, onClick, disabled, children }) => {
  return (
    <button
      type={type}
      className={`base-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomBtn;
