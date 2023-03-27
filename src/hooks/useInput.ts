import {ChangeEvent, useState} from "react";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChangeValue,
    setValue,
  };
};
export default useInput;
