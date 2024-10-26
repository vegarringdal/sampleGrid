/* eslint-disable @typescript-eslint/no-explicit-any */
import { flushSync } from "react-dom";

// need to have times, since we need to have one for each dialog
const timers: any = {};

// todo, whis will need some more work Im calling it more then I want..

export function initPositionHandler(
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    uniqueName: string,
    type: "open" | "close",
    getState: () => {
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
    }) => void
) {
    function handler() {
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;
        let bottom = getState().bottom;
        let right = getState().right;
        let height = getState().height;
        let width = getState().width;
        const closed = getState().closed;

        clearTimeout(timers[uniqueName]);
        timers[uniqueName] = setTimeout(() => {
            if (bottom + height > innerHeight) {
                bottom = innerHeight - height;

                if (bottom < 0) {
                    bottom = 0;
                    height = innerHeight;
                }
            } else {
                if (bottom < 0) {
                    bottom = 0;
                    if (bottom + height > innerHeight) {
                        bottom = 0;
                        height = innerHeight;
                    }
                }
            }

            if (right + width > innerWidth) {
                right = innerWidth - width;

                if (right < 0) {
                    right = 0;
                    width = innerWidth;
                }
            } else {
                if (right < 0) {
                    right = 0;
                    if (right + width > innerWidth) {
                        right = 0;
                        width = innerWidth;
                    }
                }
            }
            flushSync(() => {
                setState({
                    height: height,
                    width: width,
                    right: right,
                    bottom: bottom,
                    initLoaded: true,
                    closed
                });
            });
        }, 250);
    }

    if (type === "open") {
        window.addEventListener("resize", handler);
        if (!getState().initLoaded) {
            let bottom = getState().bottom;
            let right = getState().right;
            let height = getState().height;
            let width = getState().width;
            if (bottom + height > innerHeight) {
                bottom = innerHeight - height;

                if (bottom < 0) {
                    bottom = 0;
                    height = innerHeight;
                }
            } else {
                if (bottom < 0) {
                    bottom = 0;
                    if (bottom + height > innerHeight) {
                        bottom = 0;
                        height = innerHeight;
                    }
                }
            }

            if (right + width > innerWidth) {
                right = innerWidth - width;

                if (right < 0) {
                    right = 0;
                    width = innerWidth;
                }
            } else {
                if (right < 0) {
                    right = 0;
                    if (right + width > innerWidth) {
                        right = 0;
                        width = innerWidth;
                    }
                }
            }

            setState({
                height: height,
                width: width,
                right: right,
                bottom: bottom,
                initLoaded: true,
                closed
            });
        }
    }

    if (type === "close") {
        window.removeEventListener("resize", handler);
    }
}