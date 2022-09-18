import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import babel from 'rollup-plugin-babel'
import { version } from './package.json'
const banner =
  '/*!\n' +
  ` * tools v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} zhenwei\n` +
  ' * Released under the MIT License.\n' +
  ' */'
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'tools',
    banner,
  },
  plugins: [
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5',
        },
        exclude: ['node_modules'],
      },
      // useTsconfigDeclarationDir: true, 设置d.ts文件的打包目录为tsconfig.json的目录
    }),
    babel({
      exclude: 'node_modules/**', //排除node_modules
    }),
    terser({
      //压缩代码
      compress: {
        // drop_console: true //关闭console
      },
    }),
    commonjs(),
  ],
}
