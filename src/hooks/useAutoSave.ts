import {useInterval} from "usehooks-ts";
import {useSnackbar} from "react-simple-snackbar";

const SNACKBAR_OPEN_TIME_MS = 2500;
export default function useAutoSave(onSave: () => void, interval: /* ms */ number, triggered = true) {
  const [openSnackbar] = useSnackbar({
    position: "bottom-right",
  });

  useInterval(() => {
    if (!triggered) return;

    onSave();
    openSnackbar("자동저장 완료!", SNACKBAR_OPEN_TIME_MS);
  }, interval);
}
