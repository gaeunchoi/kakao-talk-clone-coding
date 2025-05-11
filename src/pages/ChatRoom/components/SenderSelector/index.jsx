import React from "react";
import "./style.css";

const SenderSelector = ({ senderType, onChange }) => {
  return (
    <div className="who-send-chat">
      <label>
        <input
          type="radio"
          name="sender"
          value="me"
          checked={senderType === "me"}
          onChange={onChange}
        />
        나
      </label>
      <label>
        <input
          type="radio"
          name="sender"
          value="target"
          checked={senderType === "target"}
          onChange={onChange}
        />
        상대방
      </label>
    </div>
  );
};

export default SenderSelector;
