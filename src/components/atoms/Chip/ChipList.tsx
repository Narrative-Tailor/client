import {ReactNode, useState} from "react";
import {ChipButtonProps} from "./ChipButton";

export interface ChipListItem {
  id: number;
  label: string;
  props?: ChipButtonProps;
  data?: any;
}

interface ChipButtonListProps {
  children: ReactNode;
}

export const useChipList = (chips: ChipListItem[]) => {
  const [selectedChip, setSelectedChip] = useState<ChipListItem | null>(chips[0]);

  const handleClickChip = (id: number) => {
    const chip = chips.find((c) => c.id === id);
    if (!chip) return;

    setSelectedChip(chip);
  };

  return {selectedChip, handleClickChip};
};

export default function ChipButtonList({children}: ChipButtonListProps) {
  return (
    <div className="flex h-12 w-full flex-wrap items-center justify-center gap-1 rounded-full p-1">{children}</div>
  );
}
