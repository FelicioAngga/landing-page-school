import { getAccessToken } from "../../../utils/getAccessToken";

export type DocumentType = {
  id?: number;
  name: string;
  type_id: number;
  applicant_id: number;
  uploaded_file: string;
  description: string;
}

export type DocsTypeResponse = {
  id: number;
  name: string;
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
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(data),
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}

export async function updateDocument(data: DocumentType) {
  const token = getAccessToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/documents/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(data),
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}

export async function getDocumentInformation(applicant_id: number | undefined) {
  if (!applicant_id) return [];
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/documents/my-information/${applicant_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson.data;
  else throw new Error(responseJson.error);
}

export async function getDocumentType() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/doctypes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`,
        "ngrok-skip-browser-warning": "true",
      },
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson.data;
  else throw new Error(responseJson.error);
}