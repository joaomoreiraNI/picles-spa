import { GetPetsRequest, GetPetsResponse } from "../../interfaces/pet";
import httpsClient from "../api/httpClient";

export async function getPets(
  params?: GetPetsRequest
): Promise<GetPetsResponse> {
  try {
    const response = await httpsClient.get("/pet", { params });

    return response.data;
  } catch (error) {
    console.log("Erro ao buscar pets", error);
    throw error;
  }
}
