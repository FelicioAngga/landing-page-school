import { getAccessToken } from "../../../utils/getAccessToken";

export type GuardianInformationType = {
  id?: number;
  applicant_id: number;
  relation: string;
  name: string;
  religion: string;
  job: string;
  address: string;
  phone: string;
  place_of_birth: string;
  date_of_birth: string;
  highest_education: string;
}

export async function getGuardianInformation(applicant_id: number | undefined) {
  if (!applicant_id) return[];
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/guardians/my-information/${applicant_id}`, {
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

export async function saveGuardianInformation(data: GuardianInformationType[]) {
  const token = getAccessToken();
  const promises = data.map(async (guardian) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/guardians`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(guardian),
      }
    );

    const responseJson = await response.json();
    if (response.status === 200) return responseJson;
    else throw new Error(responseJson.error);
  });

  return await Promise.all(promises);
}

export async function updateGuardianInformation(data: GuardianInformationType[]) {
  const token = getAccessToken();
  const promises = data.map(async (guardian) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/guardians/${guardian.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(guardian),
      }
    );

    const responseJson = await response.json();
    if (response.status === 200) return responseJson;
    else throw new Error(responseJson.error);
  });

  return await Promise.all(promises);
}
