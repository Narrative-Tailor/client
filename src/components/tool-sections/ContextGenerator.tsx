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
          <h4 className="mb-2 w-full text-[18px] font-medium">사전 문맥</h4>
          <textarea
            name="pre-p"
            className="h-36 w-full rounded-[5px] p-2"
            value={preParagraph}
            onChange={onChangePreParagraph}
          />
        </div>
        {bridgeParagraph && (
          <div className="w-full">
            <h4 className="mb-3 text-[18px]">연결 문맥</h4>
            <div className="h-auto w-full overflow-y-auto rounded-[5px] border border-[#E8E8E6]">
              <p className="bg-white p-2">{bridgeParagraph}</p>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-2 w-full text-[18px] font-medium">사후 문맥</h4>
          <textarea
            name="post-p"
            className="h-36 w-full rounded-[5px] p-2"
            value={postParagraph}
            onChange={onChangePostParagraph}
          />
        </div>
        {!bridgeParagraph && (
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
