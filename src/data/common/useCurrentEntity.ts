import { Entity, Datasource } from "@simple-html/grid";
import { useState, useEffect, useCallback } from "react";

/**
 * simple hook to extract current enity change
 * @param datasource
 * @returns
 */
export function useCurrentEntity<T>(datasource: Datasource<T>) {
  const [entity, setEntity] = useState<null | (Entity & T)>(null);

  const handleBodyClick = useCallback(() => {
    setEntity(datasource.currentEntity);
  }, [datasource]);

  useEffect(() => {
    // for some reason react do not call handle event.. I used it wrong
    const internalEventHandler = {
      handleEvent: (e: { type: string }) => {
        if (e.type === "currentEntity") {
          handleBodyClick();
        }

        return true;
      },
    };

    datasource.addEventListener(internalEventHandler);
    handleBodyClick();

    return () => {
      datasource.removeEventListener(internalEventHandler);
    };
  }, [handleBodyClick, datasource]);

  return entity;
}
