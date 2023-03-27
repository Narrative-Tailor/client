import {ChangeEvent, useState} from "react";

export interface Option {
  label: string;
  value: any;
}

const useOptions = (items: Option[], defaultOption?: Option) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [options] = useState(items);

  const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = items.find((item) => item.label === event.target.value);
    setSelectedOption(newValue);
  };

  return {
    options,
    selectedOption,
    handleChangeOption,
  };
};
export default useOptions;
