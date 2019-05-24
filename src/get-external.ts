const path = require("path");

const getDeps = (deps: { string: string }): string[] => {
  if (!deps) {
    return [];
  }

  return Object.keys(deps);
};

const getExternal = (modules: string[] = []): string[] | ((module: string) => boolean) => {
  const packageFilePath: string = path.resolve(process.cwd(), "package.json");
  const packageFile = require(packageFilePath);

  const peerDependencies = getDeps(packageFile.peerDependencies);
  const dependencies = getDeps(packageFile.dependencies);
  const externalModules: string[] = modules.concat(peerDependencies, dependencies);

  const regexps = externalModules.map(externalModule => new RegExp("^" + externalModule + "(\\/.+)*$"));
  return module => regexps.some(regexp => regexp.test(module));
};

export default getExternal;
