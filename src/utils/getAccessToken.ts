export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  }
  return null;
}

export const isAuthenticated = (): boolean => !!getAccessToken()