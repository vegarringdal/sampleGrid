import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { WorkprepModule } from "./modules/workprep/WorkprepModule";
import { ModuleSelector } from "./modules/moduleSelector/ModuleSelector";

const routes = [
  {
    path: "/",
    element: <ModuleSelector />,
  },
  {
    path: "workprep/:project/:tab",
    element: <WorkprepModule />,
  },
  {
    path: "workpacktask/:project/:tab",
    element: <div>not implemented</div>,
  },
  {
    path: "progress/:project/:tab",
    element: <div>not implemented</div>,
  },
  {
    path: "foreman/:project/:tab",
    element: <div>not implemented</div>,
  },
  {
    path: "import/:project/:tab",
    element: <div>not implemented</div>,
  },
  {
    path: "compensationcodes/:project/:tab",
    element: <div>not implemented</div>,
  },
  {
    path: "drums/:project/:tab",
    element: <div>not implemented</div>,
  },
  {
    path: "import/:project/:tab",
    element: <div>not implemented</div>,
  },
  {
    path: "opcodes/:project/:tab",
    element: <div>not implemented</div>,
  },
];

const router = createHashRouter(routes, {
  basename: location.href.includes("localhost") ? "/" : "/sampleGridInReact/",
});

export function Router() {
  return <RouterProvider router={router} />;
}
