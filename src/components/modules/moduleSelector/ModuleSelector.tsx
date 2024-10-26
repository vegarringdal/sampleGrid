import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useNavigate } from "react-router";

export function ModuleSelector() {
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    code: string;
  }>();
  const navigate = useNavigate();

  const modules = [
    {
      name: "Workpreperation",
      disabled: false,
      userGroup: "Workprep",
      desciption: "Create tag operations",
      nav: (code: string) => {
        navigate(`/workprep/${code}/cables`);
      },
    },
    {
      name: "Workpack/Task",
      disabled: true,
      userGroup: "Workprep/Foreman",
      desciption: "See details/list tagoperations",
      nav: (code: string) => {
        navigate(`/workpacktask/${code}/workpack`);
      },
    },
    {
      name: "Drum",
      disabled: true,
      userGroup: "Workprep/Foreman/Drum Coordinator",
      desciption: "Create drum/cable types/ find drum for workpacks",
      nav: (code: string) => {
        navigate(`/drums/${code}/cables`);
      },
    },
    {
      name: "Progress",
      disabled: true,
      userGroup: "Foreman",
      desciption: "Report progress on Cables / Equipment etc",
      nav: (code: string) => {
        navigate(`/progress/${code}/tagop`);
      },
    },
    {
      name: "Import",
      disabled: true,
      userGroup: "Workprep",
      desciption: "Import data to the system, like Cables/Equipment",
      nav: (code: string) => {
        navigate(`/import/${code}/cables`);
      },
    },
    {
      name: "Foreman",
      disabled: true,
      userGroup: "Workprep",
      desciption: "Import data to the system, like Cables/Equipment",
      nav: (code: string) => {
        navigate(`/foreman/${code}/all`);
      },
    },
    {
      name: "Op codes",
      disabled: true,
      userGroup: "Workprep",
      desciption: "Changes to operation codes used on tag operations",
      nav: (code: string) => {
        navigate(`/opcodes/${code}/all`);
      },
    },
    {
      name: "Compensation codes",
      disabled: true,
      userGroup: "Workprep",
      desciption: "Changes to compensation codes used on tag operations",
      nav: (code: string) => {
        navigate(`/compensationcodes/${code}/all`);
      },
    },
  ];

  // TODO:this needs to be from a api
  const projects = [
    { name: "007943 - some project description", code: "007943" },
    { name: "005469 - some project description", code: "005469" },
    { name: "002437 - some project description", code: "002437" },
    { name: "002157 - some project description", code: "002157" },
    { name: "254015 - some project description", code: "254015" },
    { name: "002457 - some project description", code: "002457" },
    { name: "002437 - some project description", code: "002437" },
    { name: "002437 - some project description", code: "002437" },
    { name: "002437 - some project description", code: "002437" },
    { name: "002347 - some project description", code: "002347" },
    { name: "004572 - some project description", code: "004572" },
    { name: "007957 - some project description", code: "007957" },
    { name: "007957 - some project description", code: "007957" },
  ];

  // somethign weird happening with select in unstyled mode

  // TODO: dropdown should be searchable

  return (
    <div className="flex flex-col flex-1">
      <div className="m-auto w-4/5 mt-10 dark:text-white flex flex-col">
        <label htmlFor="dd-select" className="text-sm">
          Select a Project
        </label>
        <Dropdown
          inputId="dd-select"
          filter
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.value)}
          options={projects}
          optionLabel="name"
          className="w-full text-sm"
          pt={{
            wrapper: {
              className: "border-1 bg-gray-100 dark:bg-gray-700 scrollbar",
            },
            input: { className: "text-sm" },
            item: { className: "p-2 outline-none" },
            itemLabel: { className: "text-sm" },
          }}
        />
      </div>

      <div className="m-auto w-4/5 mt-5 flex-1">
        <DataTable value={modules} size="small" className="text-sm">
          <Column
            className="text-sm w-1/12"
            body={(rowData) => {
              return (
                <Button
                  title="Open"
                  pt={{
                    root: { className: "p-1 text-sm " },
                  }}
                  disabled={!selectedProject || rowData.disabled}
                  onClick={() => rowData.nav(selectedProject?.code)}
                >
                  Open
                </Button>
              );
            }}
          ></Column>
          <Column
            field="name"
            header="Module Name"
            className="w-2/12 text-sm"
          ></Column>
          <Column
            field="userGroup"
            header="Module User Group"
            className="w-3/12 text-sm"
          ></Column>
          <Column
            field="desciption"
            header="About module"
            className="w-6/5 text-sm"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
