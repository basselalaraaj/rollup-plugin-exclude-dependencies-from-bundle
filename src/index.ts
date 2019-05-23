import getExternal from "./get-external";

const ExcludeDependenciesFromBundlePlugin = () => {
  return {
    name: "exclude-dependencies-from-bundle",
    options: opts => {
      opts.external = getExternal(opts.external);

      return opts;
    }
  };
};

export default ExcludeDependenciesFromBundlePlugin;
