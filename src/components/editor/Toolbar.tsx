type Props = {
  onClickAddChapter: () => void;
};
export default function Toolbar({onClickAddChapter}: Props) {
  return (
    <div className="flex h-10 w-full items-center justify-end p-1">
      <div className="flex h-full items-center gap-2">
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
