import { serviceStore } from "../../state/serviceStore";

export async function openAndReadExcelFile() {
  if (typeof showOpenFilePicker !== "function") {
    serviceStore.setState({
      errorDialogHeader: "Error",
      errorDialogContent:
        "Your browser does not support filesystem Access Api, use newest Chrome/Edge ",
      errorDialogActivated: true,
    });
    return;
  }

  const handle = await showOpenFilePicker({
    types: [
      {
        description: "Excel files",
        accept: {
          "xlsx/xlsx": [".xlsx"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  });
  
  if (handle?.length > 0) {
    const fileData = await handle[0].getFile();
    const blob = await fileData.arrayBuffer();
    return blob;
  }
}
