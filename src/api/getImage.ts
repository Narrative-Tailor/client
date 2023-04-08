import axios, {AxiosResponse} from "axios";

export interface ImageRequest {
  text: string;
}

export interface ImageResponse {
  b64_encoded_img: string;
}
export const getImage = async (data: ImageRequest) => {
  const response = await axios.post<string, AxiosResponse<ImageResponse>>(
    `${process.env.NEXT_PUBLIC_API_URL}/get-txt2img`,
    data,
  );
  return {src: `data:image/png;base64, ${response.data.b64_encoded_img}`};
};
