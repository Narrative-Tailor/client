import axios from "axios";
import {TextStyle} from "@/models/textStyle";

export const getTextStyle = () => {
  return axios.get<TextStyle[]>(`${process.env.NEXT_PUBLIC_API_URL}/get-style-list`);
};
