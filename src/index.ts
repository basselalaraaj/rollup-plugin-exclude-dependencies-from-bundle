import getExternal from './get-external';

interface ExcludeDependenciesFromBundlePlugin {
  peerDependencies?: boolean;
  dependencies?: boolean;
}

export default function ({
  peerDependencies,
  dependencies,
}: ExcludeDependenciesFromBundlePlugin = {}) {
  return {
    name: 'exclude-dependencies-from-bundle',
    options: (opts) => ({
      ...opts,
      external: getExternal(opts.external, peerDependencies, dependencies),
    }),
  };
}
