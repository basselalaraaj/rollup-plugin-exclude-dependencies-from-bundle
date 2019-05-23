const path = require("path");

export default function getExternal(modules: string[] = []): string[] | ((module: string) => boolean) {
  try {
    const packageFilePath: string = path.resolve(process.cwd(), "package.json");
    const packageFile = require(packageFilePath);

    const peerDependencies: { string: string } = packageFile.peerDependencies || {};
    const dependencies: { string: string } = packageFile.dependencies || {};
    const externalModules: string[] = [...modules, ...Object.keys(peerDependencies), ...Object.keys(dependencies)];

    const regexps = externalModules.map(externalModule => new RegExp("^" + externalModule + "(\\/.+)*$"));
    return module => {
      return regexps.some(regexp => {
        return regexp.test(module);
      });
    };
  } catch (err) {
    return [];
  }
}
