import {useInterval} from "usehooks-ts";
import {toast} from "react-toastify";

const SNACKBAR_OPEN_TIME_MS = 2500;
export default function useAutoSave(onSave: () => void, interval: /* ms */ number, triggered = true) {
  useInterval(() => {
    if (!triggered) return;

    onSave();
    toast("자동저장 완료!", {delay: SNACKBAR_OPEN_TIME_MS, position: "bottom-right"});
  }, interval);
}
