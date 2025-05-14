import { getAccessToken } from "../../../utils/getAccessToken";

export type DocumentType = {
  type_id: number;
  applicant_id: number;
  uploaded_file: string;
  description: string;
}

export async function createDocument(data: DocumentType) {
  const token = getAccessToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}