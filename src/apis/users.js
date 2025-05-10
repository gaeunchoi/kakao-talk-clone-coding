import axiosInstance from ".";

export async function getMyInfo() {
  const res = await axiosInstance({ method: "GET", url: "/users/me" });
  return res.data;
}

export async function modifyMyInfo({ name, bio }) {
  const res = await axiosInstance({
    method: "PATCH",
    url: "/users/me",
    data: { name, bio },
  });
  return res.data;
}

export async function getChatRooms() {
  const res = await axiosInstance({
    method: "GET",
    url: "/users/me/chatrooms",
  });
  return res.data;
}
