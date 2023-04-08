import Image from "next/image";
import refreshIcon from "public/refresh.svg";

export default function ResetButton({onClick}: {onClick: () => void}) {
  return (
    <button className="flex items-center gap-2 text-[14px]" type="button" onClick={onClick}>
      <Image src={refreshIcon} alt="초기화" className="h-[20px] w-[20px]" />
      초기화
    </button>
  );
}
