import { serviceStore } from "../../state/serviceStore";


export function LoadingDialog() {
    const serviceState = serviceStore();

    // if service rest api is active, we still want to keep it open
    if (!serviceState.loadingDataDialogActivated) {
        return null;
    }

    return (
        <div className="fadeIn fixed z-[7010] grid h-full w-full items-center justify-center bg-gray-50/50">
            <div className="block h-80 w-96 border border-gray-300 bg-gray-100 p-1 shadow-2xl shadow-black dark:border-gray-900 dark:bg-gray-800">
                <span className="m-auto block bg-gray-300 p-2 text-center text-2xl dark:bg-gray-700 dark:text-white">
                    Please wait
                </span>
                <div className="m-2 mt-10 block">
                    <span className="loader m-auto block text-center dark:text-white"></span>
                </div>
                <span className="m-auto block text-center font-semibold underline dark:text-white">
                    {serviceState.loadingDataDialogHeader}
                </span>
                <span className="m-auto mt-4 block whitespace-pre-line text-center dark:text-white">
                    {serviceState.loadingDataDialogContent || ""}
                </span>
            </div>
        </div>
    );
}