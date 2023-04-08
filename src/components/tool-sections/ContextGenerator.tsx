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
      <section className="flex flex-col gap-14 px-2">
        <div className="flex w-full flex-col items-center pt-1">
          <div className="flex h-12 w-full items-center justify-between">
            <h4 className="flex-1 text-[16px] font-medium">사전 문맥</h4>
            <ResetButton onClick={resetBridge} />
          </div>
          <textarea
            name="pre-p"
            className="h-56 w-full resize-none  rounded-[5px]"
            value={preParagraph}
            onChange={onChangePreParagraph}
          />
        </div>
        {bridgeParagraph && (
          <div className="w-full">
            <h4 className="mb-3 text-[16px] ">연결 문맥</h4>
            <div className="h-auto w-full overflow-y-auto rounded-[5px] border border-[#E8E8E6]">
              <textarea
                disabled
                name="post-bridge"
                className="h-56 w-full resize-none rounded-[5px] bg-white"
                value={bridgeParagraph}
              />
            </div>
          </div>
        )}
        <div className="flex w-full flex-col items-center">
          <h4 className="mb-2 w-full text-[16px] font-medium">사후 문맥</h4>
          <textarea
            name="post-p"
            className="h-56 w-full resize-none rounded-[5px]"
            value={postParagraph}
            onChange={onChangePostParagraph}
          />
        </div>
        <div className="-mt-4 w-full">
          {!bridgeParagraph && (
            <Button onClick={handleBridgeParagraph} disabled={bridgeLoading} size="full">
              중간 문맥 생성하기
            </Button>
          )}
          {bridgeLoading && <p>문맥을 생성중입니다.</p>}
          {error && <p className="text-sm text-red-600">문맥 생성 중 에러가 발생하였습니다.</p>}
        </div>
      </section>
    </div>
  );
}
