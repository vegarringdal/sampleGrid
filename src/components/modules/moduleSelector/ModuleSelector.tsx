import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";
import { useNavigate } from "react-router";

export function ModuleSelector() {
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    code: string;
  }>(null);
  const navigate = useNavigate();

  const modules = [
    {
      name: "Workpreperation",
      userGroup: "Workprep",
      desciption: "Create tag operations",
      nav: () => {
        navigate(`/workprep/${selectedProject.code}/cables`);
      },
    },
    {
      name: "Workpack/Task",
      userGroup: "Workprep/Foreman",
      desciption: "See details/list tagoperations",
      nav: () => {
        navigate(`/workpacktask/${selectedProject.code}/workpack`);
      },
    },
    {
      name: "Drum",
      userGroup: "Workprep/Foreman/Drum Coordinator",
      desciption: "Create drum/cable types/ find drum for workpacks",
      nav: () => {
        navigate(`/drums/${selectedProject.code}/cables`);
      },
    },
    {
      name: "Progress",
      userGroup: "Foreman",
      desciption: "Report progress on Cables / Equipment etc",
      nav: () => {
        navigate(`/progress/${selectedProject.code}/tagop`);
      },
    },
    {
      name: "Import",
      userGroup: "Workprep",
      desciption: "Import data to the system, like Cables/Equipment",
      nav: () => {
        navigate(`/import/${selectedProject.code}/cables`);
      },
    },
    {
      name: "Foreman",
      userGroup: "Workprep",
      desciption: "Import data to the system, like Cables/Equipment",
      nav: () => {
        navigate(`/foreman/${selectedProject.code}/all`);
      },
    },
    {
      name: "Op codes",
      userGroup: "Workprep",
      desciption: "Changes to operation codes used on tag operations",
      nav: () => {
        navigate(`/opcodes/${selectedProject.code}/all`);
      },
    },
    {
      name: "Compensation codes",
      userGroup: "Workprep",
      desciption: "Changes to compensation codes used on tag operations",
      nav: () => {
        navigate(`/compensationcodes/${selectedProject.code}/all`);
      },
    },
  ];

  // TODO:this needs to be from a api
  const projects = [
    { name: "007943 - some project description", code: "007943" },
    { name: "005469 - some project description", code: "005469" },
    { name: "002457 - some project description", code: "002457" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <div className="m-auto w-4/5 mt-10">
        <FloatLabel className="w-full">
          <Dropdown
            inputId="project-select"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.value)}
            options={projects}
            optionLabel="name"
            className="w-full"
          />
          <label htmlFor="project-select">Select a Project</label>
        </FloatLabel>
      </div>

      <div className="m-auto w-4/5 mt-5 flex-1">
        <DataTable value={modules} size="small">
          <Column field="name" header="Module" className="w-1/5"></Column>
          <Column
            field="userGroup"
            header="User group"
            className="w-1/5"
          ></Column>
          <Column
            field="desciption"
            header="Short desciption"
            className="w-2/5"
          ></Column>
          <Column
            header=""
            className="w-1/5"
            body={(rowData) => {
              return (
                <Button
                  title="Open"
                  className="bg-indigo-500 p-1"
                  disabled={!selectedProject}
                  onClick={() => rowData.nav()}
                >
                  Open
                </Button>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
