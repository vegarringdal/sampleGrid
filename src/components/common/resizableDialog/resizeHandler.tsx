/* eslint-disable @typescript-eslint/no-explicit-any */
import { flushSync } from "react-dom";

/**
 *
 * @param event
 * @param type
 * @param state
 * @param setState
 * @param minWidth default 350
 * @param setResizing if case you need to know/disable elements etc
 */
export function resizeHandler(
  event: any,
  type:
    | "top"
    | "top-left"
    | "top-right"
    | "left"
    | "right"
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "position",
  state: {
    height: number;
    width: number;
    bottom: number;
    right: number;
    initLoaded: boolean;
    closed: boolean;
  },
  setState: (state: {
    height: number;
    width: number;
    bottom: number;
    right: number;
    initLoaded: boolean;
    closed: boolean;
  }) => void,
  minWidth = 350,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setResizing: (isResizing: boolean) => void = (_isResizing: boolean) => {
    /*nothing*/
  },
) {
  let lastX = event?.clientX;
  let lastY = event?.clientY;

  let bottom = state.bottom;
  let right = state.right;
  let height = state.height;
  let width = state.width;

  function moveHandler(e: any) {
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.changedTouches?.[0]) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    const innerHeight = window.innerHeight;
    const movementX = Math.abs(Math.abs(clientX) - Math.abs(lastX));
    const movementY = Math.abs(Math.abs(clientY) - Math.abs(lastY));
    let directionX: string | null = null;
    let directionY: string | null = null;
    if (lastX > clientX) directionX = "left";
    if (lastX < clientX) directionX = "rigth";
    if (lastY > clientY) directionY = "up";
    if (lastY < clientY) directionY = "down";

    lastX = clientX;
    lastY = clientY;

    function calcTop() {
      if (directionY === "up") {
        if (bottom + height < innerHeight) {
          height = height + movementY;
        }
      }

      if (directionY === "down") {
        height = height - movementY;
        if (height < 40) {
          height = 40;
        }
      }
    }

    function calcBottom() {
      if (directionY === "up") {
        height = height - movementY;
        if (height < 40) {
          height = 40;
        } else {
          bottom = bottom + movementY;
        }
      }

      if (directionY === "down") {
        bottom = bottom - movementY;
        if (bottom < 0) {
          bottom = 0;
        } else {
          height = height + movementY;
        }
      }
    }

    function calcLeft() {
      const innerWidth = window.innerWidth;
      if (directionX === "left") {
        width = width + movementX;
        if (right + width > innerWidth) {
          width = innerWidth - right;
        }
      }
      if (directionX === "rigth") {
        if (width > minWidth) {
          width = width - movementX;
        }
      }
    }

    function calcRight() {
      if (directionX === "left") {
        if (width > minWidth) {
          right = right + movementX;
          width = width - movementX;
          if (right + width > innerWidth) {
            right = innerWidth - width;
          }
        }
      }
      if (directionX === "rigth") {
        right = right - movementX;

        if (right < 0) {
          right = 0;
        } else {
          width = width + movementX;
        }
      }
    }

    switch (type) {
      case "top":
        calcTop();
        break;
      case "top-left":
        calcTop();
        calcLeft();
        break;
      case "top-right":
        calcTop();
        calcRight();
        break;
      case "left":
        calcLeft();
        break;
      case "right":
        calcRight();
        break;
      case "bottom-left":
        calcBottom();
        calcLeft();
        break;
      case "bottom-right":
        calcBottom();
        calcRight();
        break;
      case "bottom":
        calcBottom();
        break;
      case "position":
        if (directionX === "left") {
          right = right + movementX;
          if (right + width > innerWidth) {
            right = innerWidth - width;
          }
        }

        if (directionX === "rigth") {
          right = right - movementX;
          if (right < 0) {
            right = 0;
          }
        }

        if (directionY === "up") {
          bottom = bottom + movementY;
          if (bottom + height > innerHeight) {
            bottom = innerHeight - height;
          }
        }

        if (directionY === "down") {
          bottom = bottom - movementY;
          if (bottom < 0) {
            bottom = 0;
          }
        }
        break;
    }

    flushSync(() => {
      setState({
        height: height,
        width: width,
        right: right,
        bottom: bottom,
        initLoaded: true,
        closed,
      });
    });
  }

  function upHandler() {
    setResizing(false);
    const iframes = document.getElementsByTagName("iframe");
    for (let i = 0; i < iframes.length; i++) {
      iframes[i].style.pointerEvents = "auto";
    }
    window.removeEventListener("touchend", upHandler);
    window.removeEventListener("touchmove", moveHandler);
    window.removeEventListener("mouseup", upHandler);
    window.removeEventListener("mousemove", moveHandler);
  }

  setResizing(true);
  const iframes = document.getElementsByTagName("iframe");
  for (let i = 0; i < iframes.length; i++) {
    iframes[i].style.pointerEvents = "none";
  }

  window.addEventListener("touchend", upHandler);
  window.addEventListener("touchmove", moveHandler);
  window.addEventListener("mouseup", upHandler);
  window.addEventListener("mousemove", moveHandler);
}
