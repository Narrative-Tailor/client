import Button from "@components/atoms/Button";

import {useBridge} from "@/hooks";
import ResetButton from "./ResetButton";

export default function ContextGenerator() {
  const {
    isLoading: bridgeLoading,
    error,
    bridgeParagraph,
    preParagraph,
    postParagraph,
    onChangePostParagraph,
    onChangePreParagraph,
    handleBridgeParagraph,
    resetBridge,
  } = useBridge();

  return (
    <div className="relative flex w-full flex-col gap-2 overflow-y-auto px-4">
      {bridgeLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white text-lg opacity-80">문맥 생성중</div>
      )}
      <div className="mt-2 flex items-center justify-end p-2">
        <ResetButton onClick={resetBridge} />
      </div>
      <section className="flex flex-col gap-4 px-2">
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-2 w-full font-medium">사전 문맥</h4>
          <textarea name="pre-p" className="h-36 w-full p-1" value={preParagraph} onChange={onChangePreParagraph} />
        </div>
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-2 w-full font-medium">사후 문맥</h4>
          <textarea name="post-p" className="h-36 w-full p-1" value={postParagraph} onChange={onChangePostParagraph} />
        </div>
        {bridgeParagraph ? (
          <div className="h-40 w-full overflow-y-auto border border-black p-1">
            <p>{bridgeParagraph}</p>
          </div>
        ) : (
          <Button onClick={handleBridgeParagraph}>
            <span className="text-lg font-light">중간 문맥 생성하기</span>
          </Button>
        )}
        {error && <p className="text-sm text-red-600">문맥 생성 중 에러가 발생하였습니다.</p>}
      </section>
    </div>
  );
}
