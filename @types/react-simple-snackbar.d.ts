import {CSSProperties} from "react";

declare module "react-simple-snackbar" {
  export interface SnackbarProps {
    children: React.ReactNode;
  }
  export interface SnackbarOptions {
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    style?: CSSProperties;
    closeStyle?: {
      color: string;
      fontSize: string;
    };
  }
  export function useSnackbar(
    options?: SnackbarOptions,
  ): [(message: string | ReactNode, duration?: number) => void, () => void];

  const SnackbarProvider: React.FC<SnackbarProps>;

  export default SnackbarProvider;
}
