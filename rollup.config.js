import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  plugins: [
    resolve(),
    babel({
      include: 'src/**/*.ts',
      exclude: 'node_modules/**',
    }),
    typescript()
  ],
  output: [{
      file: './dist/rollup-plugin-exclude-dependencies-from-bundle.js',
      format: 'cjs',
    },
    {
      file: './dist/rollup-plugin-exclude-dependencies-from-bundle.module.js',
      format: 'es',
    }
  ],
}
