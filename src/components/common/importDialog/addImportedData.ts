import { importDataStore } from "./importDataStore";

export function addImportedData() {
  //////////////////////////////////////////////////
  // CHANGED ROWS
  //////////////////////////////////////////////////
  const inputGridController = importDataStore.currentGridController;

  const dsRows = inputGridController.getGridDatasource().getRows(true);
  const primaryKeyName = importDataStore.primaryKeyName;

  const primaryKeyMap = new Map<
    unknown,
    Record<string, unknown> // better typing could be useful here, since we know default with $$
  >();
  dsRows.forEach((row) => {
    primaryKeyMap.set(row[primaryKeyName].toString(), row);
  });

  const changedRows = importDataStore.dataSourceChange.getRows(true);

  changedRows.forEach((row) => {
    const controllerNameRow = primaryKeyMap.get(row.$$primaryKeyValue);
    if (controllerNameRow) {
      controllerNameRow[row.$$columnChanged] = row.$$newValue;
      // related columns ? maybe accept import wont be perfect for all, not not allow import on these ?
    }
  });

  //////////////////////////////////////////////////
  // DELETED ROWS
  //////////////////////////////////////////////////
  // if change -> get row from primary key map and update
  const deleteMap = importDataStore.deletedRows;
  const toMarkAsDeleted: unknown[] = [];
  deleteMap.forEach((_, primarykey) => {
    toMarkAsDeleted.push(primaryKeyMap.get(primarykey));
  });
  inputGridController.getGridDatasource().markForDeletion(toMarkAsDeleted);

  //////////////////////////////////////////////////
  // NEW ROWS
  //////////////////////////////////////////////////
  const newRowsMap = importDataStore.newRows;

  // build up empty batch array
  const tempArr: unknown[] = [];
  newRowsMap.forEach(() => tempArr.push({}));

  // add batch arrat to dataContainer directly so we get proxy elements
  // this will stop us from triggering all event etc
  const newRowsArray = inputGridController
    .getGridDatasource()
    .getDataContainer()
    .setData(tempArr, true, true);

  // if not data, no need to continue
  if (!Array.isArray(newRowsArray)) {
    return null;
  }

  // now we just need to update data
  let i = 0;
  newRowsMap.forEach((row) => {
    const x = newRowsArray[i] as Record<string, unknown>;
    const c = JSON.parse(JSON.stringify(row));

    // we want to register change &
    // let it go through our entity handler
    // so columns act correctly in grid
    const keys = Object.keys(c);
    keys.forEach((key) => {
      x[key] = c[key];
    });

    i++;
  });

  // trick grid to rerun filter
  // TODO, there should prb be own method for this
  inputGridController.getGridDatasource().setData([], true, true);

  return null;
}
