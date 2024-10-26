import { TypeChecker } from "esbuild-helpers";

const frontend = TypeChecker({
  basePath: "./",
  name: "checker_frontend",
  tsConfig: "./tsconfig.app.json",
  throwOnSemantic: true,
  throwOnSyntactic: true,
});

frontend.printSettings();
frontend.inspectAndPrint();
