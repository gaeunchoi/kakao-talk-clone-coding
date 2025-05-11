import axiosInstance from "./index";

export async function signup({ email, password, name, phoneNumber }) {
  await axiosInstance({
    method: "POST",
    url: "/signup",
    data: { email, password, name, phoneNumber },
  });
}

export async function login({ email, password }) {
  const res = await axiosInstance({
    method: "POST",
    url: "/signin",
    data: { email, password },
  });

  return res.data;
}
