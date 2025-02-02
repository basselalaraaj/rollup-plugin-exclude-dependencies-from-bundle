import * as path from "path";

const getDeps = (dependencies: Array<string>, includeFlag = true) =>
  !dependencies || !includeFlag ? [] : Object.keys(dependencies);

export const getExternal = (
  modules: string[] = [],
  peerDependenciesFlag = true,
  dependenciesFlag = true
): string[] | ((module: string) => boolean) => {
  const packageFilePath: string = path.resolve(process.cwd(), "package.json");
  const packageFile = require(packageFilePath);

  const peerDependenciesKeys = getDeps(
    packageFile.peerDependencies,
    peerDependenciesFlag
  );
  const dependenciesKeys = getDeps(packageFile.dependencies, dependenciesFlag);

  const externalModules = [
    ...modules,
    ...peerDependenciesKeys,
    ...dependenciesKeys,
  ]
    .filter((module) => module)
    .map((externalModule) => new RegExp("^" + externalModule + "(\\/.+)*$"));

  return (module) => externalModules.some((regexp) => regexp.test(module));
};
