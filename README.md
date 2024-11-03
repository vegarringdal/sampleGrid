# PTOC sample app using grid and primereact with tailwind.

> PTOC = Project Tag Operation Control.

Trying to desktop app, similar to what I wanted a app at work to be like. Its an application with a lot of grids, so perfect for what I want to test my grid/datasource on. 

Progress will be slow, and I might change/refactor a lot. Mock data will be bad until I add something more then just static lists/maps of data. Plan is to look into sqllite


Demo link might not be up to date.
https://vegarringdal.github.io/sampleGridInReact/


# why primereact

Wanted something that allowed me to use tailwindcss, and was mostly out of the box.
Plan was to use shadcn/ui, but found prime react. Their docs look good, supported tailwindcss, and `pt` prop looked like a nice way to override default styling when needed.



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

### Entities
* Row data, usually 1-1 per service/dataset

### Common
* just holds main classes/utils needed for data folder