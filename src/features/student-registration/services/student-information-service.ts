import { getAccessToken } from "../../../utils/getAccessToken";

export type StudentInformationType = {
  id?: number;
  full_name: string;
  place_of_birth: string;
  date_of_birth: string;
  address: string;
  phone: string;
  religion: string;
  child_sequence: number;
  number_of_siblings: number;
  living_with: string;
  child_status: string;
  school_origin: string;
  registration_grade: string;
  registration_major: string;
}

export async function getStudentInformation(): Promise<StudentInformationType> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/applicants/my-information`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`,
      },
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson.data;
  else throw new Error(responseJson.error);
}

export async function saveStudentInformation(data: StudentInformationType) {
  const token = getAccessToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/applicants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        state: "draft",
      }),
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}

export async function updateStudentInformation(data: StudentInformationType) {
  const token = getAccessToken();
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/applicants/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    });
  const responseJson = await response.json();
  if (response.status === 200) return responseJson;
  else throw new Error(responseJson.error);
}
