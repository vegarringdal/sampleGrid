import { useParams } from "react-router";
import { Splitter, SplitterPanel } from "primereact/splitter";

import { WorkprepCommonPanel } from "./WorkprepCommonPanel";
import { WorkprepCableEquipment } from "./WorkprepCableEquipment";

export function WorkprepModule() {
  const { project, tab } = useParams();

  // poc to see how it looks
  document.title = `PTOC-${project}-${tab}`.toUpperCase();

  return (
    <div className="flex flex-col h-full">
      <Splitter
        className="flex w-full h-full bg-inherit"
        pt={{
          root: { className: "border-" },
          gutter: {className: "dark:bg-gray-600"},
          gutterHandler: { className: "dark:bg-gray-700" },
        }}
      >
        {/* LEFT SIDE */}

        <SplitterPanel className="flex p-2" minSize={10} size={60}>
          <WorkprepCableEquipment />
        </SplitterPanel>

        {/* RIGHT SIDE */}

        <SplitterPanel className="flex overflow-x-auto scrollbar p-2 ml-1" minSize={10} size={40}>
          <WorkprepCommonPanel />
        </SplitterPanel>
      </Splitter>
      );
    </div>
  );
}
