export type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser({
  name,
  email,
  password,
}: RegisterUser) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role_id: 1,
      }),
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}
