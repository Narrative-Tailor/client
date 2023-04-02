import {TextStyle} from "@/models/textStyle";

export const getTextStyle = () => {
  return fetch(`/api/get-style`).then((res) => res.json()) as unknown as Promise<TextStyle[]>;
};
