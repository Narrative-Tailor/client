import axios, {AxiosResponse} from "axios";

export interface ContextRequest {
  pre: string;
  post: string;
}
export interface ContextResponse {
  value: string;
}
export const getContext = async (data: ContextRequest) => {
  const response = await axios.post<string, AxiosResponse<ContextResponse>>("/api/get-context", data);
  return response.data;
};
