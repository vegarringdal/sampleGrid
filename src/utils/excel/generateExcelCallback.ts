import { serviceStore } from "../../state/serviceStore";
import { generateExcelCallbackEvents } from "./generateExcelCallbackEvents";

export function generateExcelCallback(event: generateExcelCallbackEvents) {

    console.log(event.type, event)

    switch (event.type) {
        case "error":
            serviceStore.setState({
                errorDialogActivated: true,
                errorDialogHeader: event.header,
                errorDialogContent: event.content
            });
            break;
        case "info":
            serviceStore.setState({
                loadingDataDialogActivated: true,
                loadingDataDialogHeader: event.header,
                loadingDataDialogContent: event.content
            });
            break;
        case "done":
            serviceStore.setState({
                loadingDataDialogActivated: false,
                loadingDataDialogHeader: event.header,
                loadingDataDialogContent: event.content
            });
            break;
    }
}
