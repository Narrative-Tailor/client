type Props = {
  title: string;
  onClickAddChapter: () => void;
};
export default function Toolbar({title, onClickAddChapter}: Props) {
  return (
    <div className="mt-4 mb-1 flex h-12 w-full items-center justify-end ">
      <div className="ml-8 mr-5 flex h-full w-full items-center justify-between gap-2">
        <h4 className="text-xl">{title}</h4>
        <button aria-label="추가" onClick={onClickAddChapter}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
