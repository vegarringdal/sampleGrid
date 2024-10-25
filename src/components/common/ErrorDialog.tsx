import { serviceStore } from "../../state/serviceStore";


export function ErrorDialog() {
    const serviceState = serviceStore();

    if (!serviceState.errorDialogActivated) {
        return null;
    }

    const error = serviceState.errorDialogContent;

    return (
        <div className="fadeIn fixed z-[8010] grid h-full w-full items-center justify-center bg-gray-50/50">
            <div className="relative block h-80 w-96 border border-gray-300 bg-gray-100 p-1 shadow-2xl shadow-black dark:border-gray-900 dark:bg-gray-800 ">
                <span className="m-auto block bg-gray-300 p-2 text-center text-2xl text-red-600 dark:bg-gray-700">
                    Error
                </span>

                <span className="m-auto mt-2 block text-center font-semibold underline dark:text-white">
                    {serviceState.errorDialogHeader}
                </span>

                <span className="m-auto mt-4 block flex-1 whitespace-pre-line text-center dark:text-white">
                    {error}
                </span>
                <div className="absolute bottom-2 left-0 right-0">
                    <button
                        className="m-auto block w-36 bg-gray-300 p-2 font-semibold text-indigo-600 hover:bg-gray-400 focus:outline-none dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600"
                        onClick={() => serviceState.deactivateErrorDialog()}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}