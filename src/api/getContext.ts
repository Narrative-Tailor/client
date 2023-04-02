import axios, {AxiosResponse} from "axios";

export interface ContextRequest {
  pre: string;
  post: string;
}
export interface ContextResponse {
  result: string;
}
export const getContext = async (data: ContextRequest) => {
  const response = await axios.post<string, AxiosResponse<ContextResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/get-context`,
    data,
  );
  return response.data;
};
