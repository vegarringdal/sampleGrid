import { TypeChecker } from "esbuild-helpers";

const frontend = TypeChecker({
    basePath: ".",
    name: "checker_frontend",
    shortenFilenames: false,
    tsConfig: "./tsconfig.app.json"
});

frontend.printSettings();
frontend.inspectAndPrint();
frontend.worker_watch(["./src"]);