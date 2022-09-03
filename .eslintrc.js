module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // "no-console": "off",
    // 不校验是linux或者是windows的空格
    // Git提供了一个“换行符自动转换”功能。这个功能默认处于“自动模式”，当你在签出文件时，它试图将 UNIX 换行符（LF）替换为 Windows 的换行符（CRLF）；当你在提交文件时，它又试图将 CRLF 替换为 LF。Git 的“换行符自动转换”功能听起来似乎很智能、很贴心，因为它试图一方面保持仓库内文件的一致性（UNIX 风格），一方面又保证本地文件的兼容性（Windows 风格）。但遗憾的是，这个功能是有 bug 的，而且在短期内都不太可能会修正。
    'linebreak-style': [0, 'error', 'windows'],
    quotes: 'off', // ['error', 'single'], //js使用单引号
    'no-multi-spaces': 'off', // 不能用多余的空格
    // 使用 === 替代 ==
    eqeqeq: [2, 'allow-null'],
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-redeclare': 2, // 禁止重复声明变量
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-undef': 1, // 不能有未定义的变量
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unused-vars': 'off', // 不能有声明后未被使用的变量或参数
    'no-use-before-define': 2, // 未定义前不能使用
    'no-useless-call': 2, // 禁止不必要的call和apply
    'no-var': 0, // 禁用var，用let和const代替
    'func-names': 0, // 函数表达式必须有名字
    'func-style': [0, 'declaration'], // 函数风格，规定只能使用函数声明/函数表达式
    'use-isnan': 2, // 禁止比较时使用NaN，只能用isNaN()
    'no-mixed-spaces-and-tabs': [0], // 关闭禁止混用tab和空格

    'no-cond-assign': 'error', // 禁止条件语句出现赋值
    'no-dupe-args': 'error', // 禁止出现同名参数
    'no-dupe-keys': 'error', // 禁止出现重复的key
    'no-duplicate-case': 'error', // 不允许出现重复的case
    'no-empty': 'error', // 禁止出现空语法块
    'no-ex-assign': 'error', // 禁止对catch参数重新赋值
    'no-extra-boolean-cast': 'error', // 禁止不必要的布尔转换

    'no-global-assign': 'error', // 禁止对只读的对象属性赋值
    // indent: ['error', 4], // 空格为4个字符

    // semi: ['error', 'always'], // 结尾需要分号
    'no-trailing-spaces': 'off',
    'comma-dangle': 'off', //尾随逗号
    'object-curly-newline': 'off', // 引入变量 还得换行 关闭!!!
    'react/jsx-filename-extension': [0],
    'arrow-parens': 'off', //箭头函数 可以不写 （）
    '@typescript-eslint/no-explicit-any': ['off'],
  },
}
