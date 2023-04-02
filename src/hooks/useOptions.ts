import {ChangeEvent, useState} from "react";

export interface Option {
  label: string;
  value: any;
}

const useOptions = (items: Option[], defaultOption?: Option) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = items.find((item) => item.label === event.target.value);
    setSelectedOption(newValue);
  };

  return {
    options: items,
    selectedOption,
    handleChangeOption,
  };
};
export default useOptions;
