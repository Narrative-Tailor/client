import {useEffect, useState} from "react";
import {TextStyle} from "@/models/textStyle";
import {getTextStyle} from "@/api/textStyle";

export default function useTextStyle() {
  const [textStyles, setTextStyles] = useState<TextStyle[]>([]);

  useEffect(() => {
    const getStyle = async () => {
      const data = await getTextStyle();
      setTextStyles(data);
    };

    getStyle();
  }, []);

  return textStyles;
}
