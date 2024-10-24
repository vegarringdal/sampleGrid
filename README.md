# sample app using grid and primereact with tailwind.


Demo link might not be up to date.
https://vegarringdal.github.io/sampleGridInReact/


Atm i dont know how far I will take this..
Focus is cable register under workprep, edit here and handle error, select cable etc



# About data folder

### Services
* Responsible for calling api and return data/errors etc
* This will be called by one or more `ServiceControllers`



### ServiceControllers
* Responsible for calling service
* This will be called by the `GridController`
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