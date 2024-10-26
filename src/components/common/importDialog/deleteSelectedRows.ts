import { importDataStore } from "./importDataStore";

export function deleteSelectedRows(reg: string) {
  if (reg === "change") {
    const selectedRows = importDataStore.gridInterfaceChange
      .getDatasource()
      .getSelectedRows();

    const changeRowsToRemove: Record<string, unknown>[] = [];
    const deletedRowsToRemove: Record<string, unknown>[] = [];
    const newRowsToRemove: Record<string, unknown>[] = [];

    selectedRows.forEach((entity: Record<string, unknown>) => {
      // we need to keep new adn deleted row map in sync..
      // maybe I should do this after ?
      const primaryKey = entity.$$primaryKeyValue;
      const changeType = entity.$$changeType;

      if (changeType === "Deleted") {
        const row = importDataStore.deletedRows.get(primaryKey);
        if (row) {
          deletedRowsToRemove.push(row);
          importDataStore.deletedRows.delete(primaryKey);
        }
      }

      if (changeType === "New") {
        const row = importDataStore.newRows.get(primaryKey);
        if (row) {
          newRowsToRemove.push(row);
          importDataStore.newRows.delete(primaryKey);
        }
      }

      changeRowsToRemove.push(entity);
    });

    importDataStore.gridInterfaceDeleted
      .getDatasource()
      .markForDeletion(deletedRowsToRemove);
    importDataStore.gridInterfaceNew
      .getDatasource()
      .markForDeletion(newRowsToRemove);
    importDataStore.gridInterfaceChange
      .getDatasource()
      .markForDeletion(changeRowsToRemove);
  }

  if (reg === "new") {
    const selectedRows = importDataStore.gridInterfaceNew
      .getDatasource()
      .getSelectedRows();

    const changeRowsToRemove: Record<string, unknown>[] = [];
    const newRowsToRemove: Record<string, unknown>[] = [];

    selectedRows.forEach((entity: Record<string, unknown>) => {
      const primaryKey = entity["$dummyPrimary"];

      {
        const row = importDataStore.changedRows.get(primaryKey);
        if (row) {
          changeRowsToRemove.push(row);
          importDataStore.changedRows.delete(primaryKey);
          importDataStore.newRows.delete(primaryKey);
        }
      }

      newRowsToRemove.push(entity);
    });

    importDataStore.gridInterfaceNew
      .getDatasource()
      .markForDeletion(newRowsToRemove);
    importDataStore.gridInterfaceChange
      .getDatasource()
      .markForDeletion(changeRowsToRemove);
  }

  if (reg === "deleted") {
    const selectedRows = importDataStore.gridInterfaceDeleted
      .getDatasource()
      .getSelectedRows();

    const changeRowsToRemove: Record<string, unknown>[] = [];
    const deletedRowsToRemove: Record<string, unknown>[] = [];

    selectedRows.forEach((entity: Record<string, unknown>) => {
      const primaryKey = entity[importDataStore.primaryKeyName]?.toString();

      {
        const row = importDataStore.changedRows.get(primaryKey);
        if (row) {
          changeRowsToRemove.push(row);
          importDataStore.changedRows.delete(primaryKey);
          importDataStore.deletedRows.delete(primaryKey);
        }
      }

      deletedRowsToRemove.push(entity);
    });

    importDataStore.gridInterfaceDeleted
      .getDatasource()
      .markForDeletion(deletedRowsToRemove);
    importDataStore.gridInterfaceChange
      .getDatasource()
      .markForDeletion(changeRowsToRemove);
  }
}
