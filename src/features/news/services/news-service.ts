export type NewsResponseType = {
  data: NewsDetailResponseType[];
  limit: number;
  page: number;
  total: number;
}

export type NewsDetailResponseType = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  created_at: string;
}

export type NewsParamsType = {
  page: number;
  limit: number;
  search: string;
}

export async function getNews({ page, limit, search }: NewsParamsType) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/blogs?page=${page}&limit=${limit}&search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}

export async function getNewsById(id: string): Promise<NewsDetailResponseType> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson.data;
  else throw new Error(responseJson.error);
}