export async function getChatRoomsInfo({ chatroomId, token }) {
  const res = await fetch(
    `https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("채팅방 정보를 불러오지 못했습니다.");
  const data = await res.json();
  return data;
}

export async function getChatRoomContent({ chatroomId, token }) {
  const res = await fetch(
    `https://goorm-kakaotalk-api.vercel.app/api/chatrooms/${chatroomId}/chats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("채팅방 내용을 불러오지 못했습니다.");
  const data = await res.json();
  return data;
}
