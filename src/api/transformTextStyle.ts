import axios, {AxiosResponse} from "axios";

export interface TransformStyleRequest {
  style: string;
  text: string;
}

export interface TransformStyleResponse {
  result: string;
}
export const transformStyle = async (data: TransformStyleRequest) => {
  const response = await axios.post<string, AxiosResponse<TransformStyleResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/get-style`,
    data,
  );
  return response.data;
};
