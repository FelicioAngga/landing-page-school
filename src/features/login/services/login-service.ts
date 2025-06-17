export type LoginUser = {
  email: string;
  password: string;
};

export async function loginUser({
  email,
  password,
}: LoginUser) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  const responseJson = await response.json();
  if (response.status === 200 && responseJson?.data?.role_name === "Applicant") {
    const { token, ...restData } = responseJson?.data;
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(restData));
  }

  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}

export function getUser() {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
}