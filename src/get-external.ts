const path = require('path');

const getDeps = (deps: { string: string }, includeFlag = true): string[] => {
  if (!deps || !includeFlag) {
    return [];
  }

  return Object.keys(deps);
};

const getExternal = (
  modules: string[] = [],
  peerDependencies = true,
  dependencies = true
): string[] | ((module: string) => boolean) => {
  const packageFilePath: string = path.resolve(process.cwd(), 'package.json');
  const packageFile = require(packageFilePath);

  const peerDependenciesKeys = getDeps(
    packageFile.peerDependencies,
    peerDependencies
  );
  const dependenciesKeys = getDeps(packageFile.dependencies, dependencies);
  const externalModules: string[] = modules.concat(
    peerDependenciesKeys,
    dependenciesKeys
  );

  const regexps = externalModules.map(
    (externalModule) => new RegExp('^' + externalModule + '(\\/.+)*$')
  );
  return (module) => regexps.some((regexp) => regexp.test(module));
};

export default getExternal;
