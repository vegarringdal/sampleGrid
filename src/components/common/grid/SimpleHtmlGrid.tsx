/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridInterface } from "@simple-html/grid";
import "@simple-html/grid";
import "@simple-html/grid/dist/grid.css";
import "@simple-html/grid/dist/date.css";
import { useEffect, useRef } from "react";

/**
 * This is just a grid container, so I can use the vanilla grid in react
 * this also added some features like double click on grid row
 * PS! editing this with hot reloading will create weird behavior
 */
export function SimpleHtmlGrid(props: {
  id?: string;
  style?: { width?: string; height?: string };
  interface: GridInterface<any>;
  className?: string;
  date?: any;
}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) {
      // dom element does not have final size on first call to useEffect
      setTimeout(() => {
        ref.current.enableCleanup = true; // fixes issue hmr can generate/or just bad cleanup from react
        ref.current.connectInterface(props.interface);
      }, 0);
    }
    return () => {};
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <simple-html-grid
      id={props.id}
      ref={ref}
      style={{
        width: props.style?.width,
        height: props.style?.height,
      }}
      class={props.className}
    />
  );
}
