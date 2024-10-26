# PTOC sample app using grid and primereact with tailwind.

Im going to try and build a simple frontend for the application I would like to have at work when I worked with this. 

> PTOC = Project Tag Operation Control. Workprep module for creating tag(work) operations for cables/equipment. From import of tag to progress reporting on drum etc.


Demo link might not be up to date.
https://vegarringdal.github.io/sampleGridInReact/



First focus is cable register under workprep
Will add some simple mock data as I get further,main goes is to find out if data folder stucture will work.

Need to be able to handle very large data sets, cable 20k, equipment 20k, tagoperations 300k, workpack 10k, task 10k, progress 300k +50k misc



* [ ] common grid traits for gridController
  * [x] edit mode
  * [x] simple dialog for releated data configured as part of gridController
    * cable
  * [x] copy/paste cell into selected rows (with related data)
  * [x] duplicate row
    * [ ] need to fix releated
  * [x] export
  * [x] import data from excel
  *   [ ] import/export will need work with better labels
  * [ ] save (just send data to service)
  * [ ] how to show nice error message if save fails, stop of row ? use own column ?

* [ ] create tag operation gui
  * [ ] dummy data
  * [ ] call custom event to ServiceController with selected tag/cables and operations to create

* [ ] filter tag/cables from selected tag operations
* [ ] filter tag/cable from selected workpacks
* [ ] filter tagoperations from selected workpacks
* [ ] filter docs from selected tags or cables
* [ ] filter tag/cables from documents
* ... later


# About data folder


### Services
* Responsible for calling api and return data/errors etc
* This will be called by one or more `ServiceControllers`

### ServiceControllers
* Responsible for calling service
* This will be called by the `GridController` default or custom event
* One `ServiceController` is shared between many `GridControllers`
  * since you might have same data in main view and sometimes in dialog etc   
  * since it shared between many, you will be able to update all if service gives you new data 

### GridControllers
* You create a gridController for each grid you plan to use
  * Do not use same gridController on a page at once
* When you create this, you supply `GridControllerConfig` and a `ServiceController`
  * `GridControllerConfig` will tell how grid is supposed to behave
    * allow to delete, multiselect, columns etc, primary ID/column, releated gridControllers
* Grid controller will call `ServiceController` when user ask for refresh or save

### entities
* Row data, usually 1-1 per service/dataset

### Common
* just holds main classes/utils needed for data folder