


datastate needs to have own service / config
config will generate each gridConfig/datasource, so we dont need to create one for each

each datasource also needs a state handler for datasource/service/gridconfig so we know if we are in edit mode/loading etc.


Datasources needed
* cables
* equipment
* workpack
* workpack tag operations (selected workpack, workpackTask)
* routing - all
* routing - selected cable tag
* document - all (might need something special here)
* document - selected equipment tag
* document - selected cable tag
* forman
* workers (for forman)
* task
* task tagoperations (selected task, workpackTask)
* compensations codes  (3 levels, really dont like the levels)
* op codes
* comp factors
* progress
* tagoperations - all
* tagoperations - selected workpack
* tagoperations - selected task
* import equipment tags (source and target)
* import cable - tags (source and target)
* import mc (source and target)
* import documents (source and target)
* import routing (source and target)
* import mc status ? (source and target)
* task area
* mc
* com
* activities
* area (needed for task/activity) -- more types here..
* drum
* cabletype (combo of dim/sort)
* cableDim - like 1x2x0.75
* cableSort = like BFOU or TFSI etc (usiualy insulation/power/sheath)
* template (workprep create tag opertions)
* template lines  (workprep create tag opertions)


might be more I dont remember atm, a lof of stuff under task I dont remember