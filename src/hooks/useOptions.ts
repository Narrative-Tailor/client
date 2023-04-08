import {ChangeEvent, useCallback, useState} from "react";

export interface Option {
  label: string;
  value: string;
}

const useOptions = (items: Option[], defaultOption: Option) => {
  const [selectedOption, setSelectedOption] = useState<Option>(defaultOption || items[0]);

  const handleChangeOption = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newValue = items.find((item) => item.label === event.target.value);
      if (!newValue) return;
      setSelectedOption(newValue);
    },
    [items],
  );

  return {
    options: items,
    selectedOption,
    handleChangeOption,
  };
};
export default useOptions;
