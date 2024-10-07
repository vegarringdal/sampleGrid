/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { modeStore } from "../../state/mode";

/**
 * dark theme helper for grid
 * this also overrides some defaults in grid so it fits better within the application
 */

export function SetGridTheme() {
  const ref = useRef<any>(null);
  const modeState = modeStore();

  useEffect(() => {
    if (ref.current) {
      if (modeState.isDarkTheme === true) {
        let children = ref.current.childNodes;
        while (children.length) {
          children[0]?.parentNode.removeChild(children[0]);
          children = ref.current.childNodes;
        }
        /**
         * dark mode overrides
         */
        ref.current.append(
          document.createTextNode(`
                    body,
                    .simple-html-grid-menu,
                    .simple-html-grid {
                        --simple-html-grid-main-bg-color: #374151;
                        --simple-html-grid-sec-bg-color: #4b5563;
                        --simple-html-grid-alt-bg-color: #4b5563;
                        --simple-html-grid-main-bg-border: #1f2937;
                        --simple-html-grid-main-bg-even: #59606a;
                        --simple-html-grid-main-bg-odd: #6b7178;
                        --simple-html-grid-sec-bg-border: #1f2937;
                        --simple-html-grid-pinned-border: #1f2937;
                        --simple-html-grid-main-bg-selected-odd: #234882;
                        --simple-html-grid-main-bg-selected-even: #274e8f;
                        --simple-html-grid-main-font-color: #f9f7f7;
                        --simple-html-grid-sec-font-color: #979494;
                        --simple-html-grid-dropzone-color: rgb(151, 148, 148, 0.4);
                        --simple-html-grid-grouping-border: #1f2937;
                        --simple-html-grid-boxshadow: #4b5563;
                        --simple-html-grid-main-hr-border: #4b5563;
                    }
                    .simple-html-grid ul.dialog-row {
                        box-shadow: none;
                    
                    }
                    .simple-html-grid li.dialog-row {
                        border-left: 1px dotted rgb(100, 100, 100);
                    } 
                    .simple-html-grid .grid-edit-button {
                        border-color: #374151;
                    }
                    .simple-html-grid .filter-dialog-bottom-row{
                        border-top: 0px;
                    }
                    .simple-html-grid .filter-dialog-bottom-row button{
                        border: 1px solid #515458;
                    }
                    .simple-html-grid-header input::placeholder {
                        filter: opacity(1);
                    }
                    .simple-html-grid-menu {
                        z-index: 70000 !important;
                    }
                    .simple-html-grid-drag {
                        z-index: 70000 !important;
                    }
    
                    .simple-html-grid input[readonly] {
                        cursor: pointer;
                    }
                    
                    .simple-html-grid input[type='checkbox']{
                        margin: 2px;
                    }
    
                    body,
                    .simple-html-date {
                        
                        --simple-html-date-main-bg-color: #374151;
                        --simple-html-date-main-color: #f9f7f7;
                        --simple-html-date-dimmed-color: #979494;
                        --simple-html-date-week-color: #8b8b8b;
                        --simple-html-date-header-bg-border: #8b8b8b;
                        --simple-html-date-main-bg-border:  #979494;
                        --simple-html-date-main-bg-selected: #234882;
                    
                    }
                    .simple-html-date button, .icon {
                        color: #60a5fa
                    }
    
                    .simple-html-grid .simple-html-grid-icon-group-svg {
                        color: #60a5fa;
                    }
    
                    .simple-html-grid .filter-editor-content .grid-button-small {
                        color: #60a5fa;
                    }
    
                    .simple-html-grid .filter-editor-content .grid-button {
                        color: #60a5fa;
                    }

                   
            
                    `)
        );
      } else {
        let children = ref.current.childNodes;
        while (children.length) {
          children[0]?.parentNode.removeChild(children[0]);
          children = ref.current.childNodes;
        }
        /**
         * light mode overrides
         */
        ref.current.append(
          document.createTextNode(`
                    body,
                    .simple-html-grid-header input::placeholder {
                        filter: opacity(1);
                    }
                    .simple-html-grid-menu {
                        z-index: 70000 !important;
                    }
                    .simple-html-grid-drag {
                        z-index: 70000 !important;
                    }
                    .simple-html-grid input[readonly] {
                        cursor: pointer;
                    }
                    .simple-html-grid input[type='checkbox']{
                        margin: 2px;
                    }
                    .simple-html-date button, .icon {
                        color: #4f46e5;
                    }
    
                    
                    .simple-html-grid .simple-html-grid-icon-group-svg {
                        color: #4f46e5;
                    }
    
                    .simple-html-grid .filter-editor-content .grid-button-small {
                        color: #4f46e5;
                    }
    
                    .simple-html-grid .filter-editor-content .grid-button {
                        color: #4f46e5;
                    }

                    
                  `)
        );
      }
    }
  });

  return <style ref={ref}></style>;
}
