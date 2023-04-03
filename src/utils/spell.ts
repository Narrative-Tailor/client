import {Typo, spellCheckByPNU} from "hanspell";

const DEFAULT_TIMEOUT = 6000;

export const spellCheck = (
  sentence: string,
  onEnd?: () => void,
  onError?: (error: Error) => void,
  timeout = DEFAULT_TIMEOUT,
) => {
  return new Promise<Typo[]>((resolve) => {
    const onSuccess = (typo: Typo[]) => {
      resolve(typo);
    };

    spellCheckByPNU(sentence, timeout, onSuccess, onEnd, onError);
  });
};
