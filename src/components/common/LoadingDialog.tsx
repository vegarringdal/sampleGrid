import { loadingDialogStore } from "../../state/loadingDialogStore";

export function LoadingDialog() {
  const state = loadingDialogStore();

  if (!state.isActive) {
    return null;
  }

  return (
    <div className="fadeIn fixed z-[9000] grid h-full w-full items-center justify-center bg-gray-200/50 dark:bg-gray-600/70">
      <div className="block h-80 w-96 bg-gray-100 dark:bg-gray-800 shadow-2xl">
        <span className="m-auto block bg-gray-200 dark:bg-gray-900 p-2 text-center text-2xl dark:text-white">
          Please wait
        </span>
        <div className="m-2 mt-10 block">
          <span className="loader m-auto block text-center text-white"></span>
        </div>
        <span className="m-auto block text-center font-semibold dark:text-white underline">
          {state.header}
        </span>
        <span className="m-auto mt-4 block whitespace-pre-line text-center dark:text-white">
          {state.content || ""}
        </span>
      </div>
    </div>
  );
}
