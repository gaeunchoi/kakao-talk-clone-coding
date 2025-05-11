import axiosInstance from ".";

export async function getChatRoomsInfo({ chatroomId }) {
  const res = await axiosInstance({
    method: "GET",
    url: `/chatrooms/${chatroomId}`,
  });

  return res.data;
}

export async function getChatRoomContent({ chatroomId }) {
  const res = await axiosInstance({
    method: "GET",
    url: `/chatrooms/${chatroomId}/chats`,
  });

  return res.data;
}

export async function sendChatMessage({ chatroomId, sender_id, content }) {
  const res = await axiosInstance({
    method: "POST",
    url: `/chatrooms/${chatroomId}/chats`,
    data: { sender_id, content },
  });
  return res.data;
}
