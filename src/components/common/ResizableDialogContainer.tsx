/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { initPositionHandler } from "./resizableDialogCommon/initPositionHandler";
import { resizeHandler } from "./resizableDialogCommon/resizeHandler";
import { MinMaximizeIcon } from "./resizableDialogCommon/minMaximizeIcon";

/**
 * helper to generate resizable container you can also mouse around
 * @param props
 * @returns
 */
export function ResizableDialogContainer(props: {
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
    adjustOnLoad?: boolean;
    isOpen: boolean;
    isModal?: boolean;
    uniqueName: string;
    onClose: (curSite?: { height: number; width: number; bottom: number; right: number }) => void;
    title: string;
    children: any;
}) {
    const refMain = useRef(null);
    const [check, setCheck] = useState<number | null>();

    const [sizeState, setDataState] = useState({
        height: 100,
        width: 100,
        bottom: 0,
        right: 0,
        initLoaded: false,
        closed: !props.isOpen
    });

    useEffect(() => {
        if (props.isOpen) {
           // mouseDownHandler({ target: refMain?.current } as any);
        }
    }, [props.isOpen]);

    useEffect(() => {
        if (!check && props.isOpen) {
            setCheck(1);

            let state = {
                height: 0,
                width: 0,
                bottom: 0,
                right: 0,
                initLoaded: false,
                closed: !props.isOpen
            };

            if (props.adjustOnLoad) {
                if (props.width && props.height) {
                    const width = window.innerWidth - props.width;
                    const height = window.innerHeight - props.height;
                    state = {
                        height: props.height,
                        width: props.width,
                        bottom: Math.floor((height || 100) / 2),
                        right: Math.floor((width || 100) / 2),
                        initLoaded: false,
                        closed: !props.isOpen
                    };
                }

                if (props.right && props.bottom) {
                    const width = window.innerWidth - props.right * 2;
                    const height = window.innerHeight - props.bottom * 2;
                    state = {
                        height: height,
                        width: width,
                        bottom: props.bottom,
                        right: props.right,
                        initLoaded: false,
                        closed: !props.isOpen
                    };
                }
            } else {
                state = {
                    height: props.height || sizeState.height,
                    width: props.width || sizeState.width,
                    bottom: props.bottom || sizeState.bottom,
                    right: props.right || sizeState.right,
                    initLoaded: false,
                    closed: !props.isOpen
                };
            }

            setDataState(state);
            initPositionHandler({} as any, props.uniqueName, "open", () => state, setDataState);
        } else {
            initPositionHandler({} as any, props.uniqueName, "open", () => sizeState, setDataState);
        }

        return () => {
            initPositionHandler(
                {} as any,
                props.uniqueName,
                "close",
                () => sizeState,
                setDataState
            );
        };
    });

    const style = {
        bottom: sizeState.bottom,
        right: sizeState.right,
        width: sizeState.width,
        height: sizeState.height,
        zIndex: 110
    };

    if (!props.isOpen) {
        return null;
    }

    const classname = props.isModal
        ? "fixed bg-slate-500/70 top-0 bottom-0 left-0 right-0 z-[1000]"
        : "";

    return (
        <div className={classname}>
            <div
                ref={refMain}
                style={style}
                className="floating-dialog absolute mb-2 flex select-none flex-col overflow-hidden border bg-white dark:border-gray-900 dark:bg-gray-800 p-1 shadow-2xl shadow-black"
            >
                <div
                    className="z-50 flex cursor-move bg-gray-100 dark:bg-gray-700"
                    onPointerDown={(e) => {
                        // mostly just have 1 dialog open at once, so prob dont need any bring to front logic

                        resizeHandler(e, "position", sizeState, setDataState);
                    }}
                >
                    <span className="m-auto p-1 text-base dark:text-white">{props.title}</span>
                    <div className="absolute right-1 flex gap-2">
                        <MinMaximizeIcon
                            uniqueName={props.uniqueName}
                            state={sizeState}
                            setState={setDataState}
                        ></MinMaximizeIcon>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 dark:bg-gray-700 font-semibold text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            data-tooltip="close"
                            strokeWidth={2}
                            onClick={() => {
                                props.onClose({
                                    height: sizeState.height,
                                    width: sizeState.width,
                                    bottom: sizeState.bottom,
                                    right: sizeState.right
                                });
                                setCheck(0);
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
                <div className="scrollbar absolute bottom-1 left-1 right-1 top-8 flex">
                    {props.children}
                </div>

                <div className="absolute bottom-0 left-0 right-0 top-0 z-[-10]">
                    <div
                        className="absolute right-0 top-0 z-50 h-3 w-3 cursor-ne-resize"
                        onPointerDown={(e) =>
                            resizeHandler(e, "top-right", sizeState, setDataState)
                        }
                    ></div>
                    <div
                        className="absolute bottom-0 right-0 z-50 h-3 w-3 cursor-nw-resize"
                        onPointerDown={(e) =>
                            resizeHandler(e, "bottom-right", sizeState, setDataState)
                        }
                    ></div>
                    <div
                        className="absolute left-0 top-0 z-50 h-3 w-3 cursor-nw-resize"
                        onPointerDown={(e) => resizeHandler(e, "top-left", sizeState, setDataState)}
                    ></div>
                    <div
                        className="absolute bottom-0 left-0 z-50 h-3 w-3 cursor-ne-resize"
                        onPointerDown={(e) =>
                            resizeHandler(e, "bottom-left", sizeState, setDataState)
                        }
                    ></div>
                    <div
                        className="absolute bottom-0 left-5 right-5 z-50 h-2 cursor-n-resize"
                        onPointerDown={(e) => resizeHandler(e, "bottom", sizeState, setDataState)}
                    ></div>

                    <div
                        className="z-5000 absolute left-5 right-5 top-0 h-2 cursor-n-resize"
                        onPointerDown={(e) => resizeHandler(e, "top", sizeState, setDataState)}
                    ></div>

                    <div
                        className="z-5000 absolute bottom-5 left-0 top-5 w-2 cursor-e-resize"
                        onPointerDown={(e) => resizeHandler(e, "left", sizeState, setDataState)}
                    ></div>

                    <div
                        className="z-5000 absolute bottom-5 right-0 top-5 w-2 cursor-e-resize"
                        onPointerDown={(e) => resizeHandler(e, "right", sizeState, setDataState)}
                    ></div>
                </div>
            </div>
        </div>
    );
}