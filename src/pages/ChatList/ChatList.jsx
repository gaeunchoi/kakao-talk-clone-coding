import "./ChatList.css";
import profileImg from "../../assets/aguileon.jpg";
const ChatList = () => {
  const userName = "admin";
  const testData = Array(20).fill({
    name: "상대방입니다",
    lastMessage: "욤뇽뇽얌냥냥냥냥~",
    time: "오후 5:23",
  });

  return (
    <div className="chat-list-container">
      <div className="chat-list-title">
        <h2>{userName}님의 ChatList</h2>
      </div>
      <div className="chat-list-content">
        <div className="profile-container">
          <img src={profileImg} alt="profileImg" className="profileImg" />
          <div className="profileText">
            <h3>{userName}</h3>
            <p>상태메시지</p>
          </div>
          <button className="my-chat-room-btn">나와의 채팅</button>
        </div>
        <div className="chat-rooms">
          {testData.map((data, idx) => (
            <div key={idx} className="profile-container">
              <img src={profileImg} alt="profileImg" className="profileImg" />
              <div className="profileText">
                <h3>{data.name}</h3>
                <p>{data.lastMessage}</p>
              </div>
              <span className="last-chat-time">{data.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
