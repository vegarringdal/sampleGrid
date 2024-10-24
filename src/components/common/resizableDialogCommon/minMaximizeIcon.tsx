import { useState } from "react";

const lastHeightMap = new Map<string, number>();

export function MinMaximizeIcon(props: {
  uniqueName?: string;
  state: {
    height: number;
    width: number;
    bottom: number;
    right: number;
    initLoaded: boolean;
    closed: boolean;
  };
  setState: (state: {
    height: number;
    width: number;
    bottom: number;
    right: number;
    initLoaded: boolean;
    closed: boolean;
  }) => void;
}) {
  const [height, setHeight] = useState(props.state.height);

  if (props.state.height === 40) {
    return (
      <div className="h-6 w-6 cursor-pointer bg-gray-700 font-semibold text-blue-600 hover:bg-gray-600 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
          onClick={() => {
            if (props.uniqueName) {
              const lastHeight = lastHeightMap.get(props.uniqueName) || 150;
              const bottom = props.state.bottom - lastHeight + 40;
              props.setState({ ...props.state, bottom, height: lastHeight });
            } else {
              const bottom = props.state.bottom - height + 40;
              props.setState({ ...props.state, bottom, height });
            }
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    );
  } else {
    return (
      <div className="h-6 w-6 cursor-pointer bg-gray-700 font-semibold text-blue-600 hover:bg-gray-600 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
          onClick={() => {
            if (props.uniqueName) {
              lastHeightMap.set(props.uniqueName, props.state.height);
            }

            setHeight(props.state.height);
            const newBottom = props.state.bottom + props.state.height - 40;
            props.setState({ ...props.state, bottom: newBottom, height: 40 });
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
    );
  }
}
