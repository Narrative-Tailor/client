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
    <div className="relative flex w-full flex-col overflow-y-auto px-4">
      <div className="flex items-center justify-end p-2">
        <ResetButton onClick={resetBridge} />
      </div>
      <section className="flex flex-col gap-4 px-2">
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-2 w-full text-[16px] font-medium">사전 문맥</h4>
          <textarea name="pre-p" className="h-36 w-full p-1" value={preParagraph} onChange={onChangePreParagraph} />
        </div>
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-2 w-full text-[16px] font-medium">사후 문맥</h4>
          <textarea name="post-p" className="h-36 w-full p-1" value={postParagraph} onChange={onChangePostParagraph} />
        </div>
        {bridgeParagraph ? (
          <div className="h-auto w-full overflow-y-auto">
            <h4 className="mb-3 text-[16px]">중간 문맥 생성 결과</h4>
            <p className="bg-white p-2">{bridgeParagraph}</p>
          </div>
        ) : (
          <Button onClick={handleBridgeParagraph} disabled={bridgeLoading}>
            중간 문맥 생성하기
          </Button>
        )}
        {bridgeLoading && <div className="text-[14px]">문맥 생성중</div>}
        {error && <p className="text-sm text-red-600">문맥 생성 중 에러가 발생하였습니다.</p>}
      </section>
    </div>
  );
}
