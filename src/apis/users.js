export async function getMyInfo({ token }) {
  const res = await fetch(
    "https://goorm-kakaotalk-api.vercel.app/api/users/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res);
  if (!res.ok) {
    throw new Error("유저 정보를 불러오지 못했습니다.");
  }

  const data = await res.json();
  return data;
}

export async function modifyMyInfo({ name, bio, token }) {
  const res = await fetch(
    "https://goorm-kakaotalk-api.vercel.app/api/users/me",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, bio }),
    }
  );

  if (!res.ok) throw new Error("프로필 업데이트에 실패했습니다.");

  const data = await res.json();
  return data;
}

export async function getChatRooms({ token }) {
  try {
    const res = await fetch(
      "https://goorm-kakaotalk-api.vercel.app/api/users/me/chatrooms",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (e) {
    console.error("🚨 에러 발생: ", e);
    throw e;
  }
}
