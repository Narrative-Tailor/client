import axios, {AxiosResponse} from "axios";

export interface MindMapRequest {
  topic: string;
  genre: string;
  num: string;
}

export interface MindMapResponse {
  result: string[];
}
export const getMindMap = async (data: MindMapRequest) => {
  const response = await axios.post<string, AxiosResponse<MindMapResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/get-mindmap`,
    data,
  );
  return response.data.result;
};
