export async function signup({ email, password, name, phoneNumber }) {
  const res = await fetch("https://goorm-kakaotalk-api.vercel.app/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      name,
      phoneNumber,
    }),
  });

  const data = await res.json();
  return { res, data };
}

export async function login({ email, password }) {
  const res = await fetch("https://goorm-kakaotalk-api.vercel.app/api/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();
  return { res, data };
}
