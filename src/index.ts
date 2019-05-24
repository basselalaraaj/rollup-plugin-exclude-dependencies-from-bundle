import getExternal from "./get-external";

const ExcludeDependenciesFromBundlePlugin = ({
  peerDependencies,
  dependencies
}: { peerDependencies?: boolean; dependencies?: boolean } = {}) => {
  return {
    name: "exclude-dependencies-from-bundle",
    options: opts => {
      opts.external = getExternal(opts.external, peerDependencies, dependencies);

      return opts;
    }
  };
};

export default ExcludeDependenciesFromBundlePlugin;
