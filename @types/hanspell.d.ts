declare module "hanspell" {
  type Typo = {
    type: string;
    token: string;
    suggestions: string[];
    context: string;
    info?: string;
  };

  type SpellCheckCallback = (typos: Typo[]) => void;
  type ErrorCallback = (error: Error) => void;

  function spellCheckByDAUM(
    sentence: string,
    timeout: number,
    callback: SpellCheckCallback,
    end?: () => void,
    error?: ErrorCallback,
  ): void;

  function spellCheckByPNU(
    sentence: string,
    timeout: number,
    callback: SpellCheckCallback,
    end?: () => void,
    error?: ErrorCallback,
  ): void;
}
