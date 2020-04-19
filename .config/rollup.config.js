import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'umd',
    name: 'SveltePopper',
    file: 'dist/svelte-popper.js',
  },
  plugins: [
    svelte({
      dev: false,
      emitCss: false,
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
};
