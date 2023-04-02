import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {TextStyle} from "@/models/textStyle";
import {getTextStyle} from "@/api/textStyle";

export default function useTextStyle() {
  const [error, setError] = useState<AxiosError | null>(null);
  const [textStyles, setTextStyles] = useState<TextStyle[]>([]);

  useEffect(() => {
    const getStyle = async () => {
      try {
        const {data} = await getTextStyle();
        setTextStyles(data);
        setError(null);
      } catch (err) {
        setError(err as AxiosError);
      }
    };

    getStyle();
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error.message === "Network Error") {
      console.error("네트워크 에러 발생");
    }
  }, [error]);

  return textStyles;
}
