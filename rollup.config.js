import {
  terser
} from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'tools'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**', //排除node_modules
    }),
    terser({ //压缩代码
      compress: {
        // drop_console: true //关闭console
      }
    }),
    commonjs(),
    serve({
      contentBase: './dist', //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020 //端口号，默认10001
    }),
    livereload('dist') //watch dist目录，当目录中的文件发生变化时，刷新页面
  ],

}