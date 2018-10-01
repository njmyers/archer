import flow from 'rollup-plugin-flow';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals'
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
// import

export default [
  {
    input: 'src/index.js',
    external: [...Object.keys(pkg.dependencies), 'child_process', 'os', 'path', 'fs'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      // we have to strip flow first order is crucial here
      flow(),
      resolve(),
      globals(),
      builtins(),
      babel({ exclude: 'node_modules/**' }),
      commonjs(),
    ],
  },
];
