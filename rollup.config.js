import path from 'path';
import directory from '@njmyers/directory';
import flow from 'rollup-plugin-flow';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const config = {
  external: [
    ...Object.keys(pkg.dependencies),
    'child_process',
    'os',
    'path',
    'fs',
  ],
  plugins: [
    // we have to strip flow first order is crucial here
    flow(),
    json(),
    resolve(),
    globals({
      process: false,
      dirname: false,
    }),
    builtins(),
    babel({ exclude: 'node_modules/**' }),
    commonjs(),
  ],
};

const configs = directory(path.resolve(__dirname, 'src/programs'), {
  recursive: true,
})
  .filter((string) => /program.js/gi.test(string))
  .map((string) => ({
    ...config,
    input: string,
    output: [
      {
        file: `build/${string
          .split('/program.js')[0]
          .split('/')
          .slice(-1)}.cjs.js`,
        format: 'cjs',
        sourcemap: true,
      },
    ],
  }));

export default configs;
