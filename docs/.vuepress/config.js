import { defaultTheme } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
export default {
  base: '/dreamforl/',
  date: 'yyyy-MM-dd',
  lang: 'zh-CN',
  title: 'js-tools-function',
  head: [['link', { rel: 'icon', href: './favicon.ico' }]],
  theme: defaultTheme({
    logo: '/favicon.ico',
    navbar: [
      {
        text: '仓库',
        children: [
          {
            text: 'Gitee',
            link: 'https://gitee.com/zaoanmiao/js-tools-function',
          },
          {
            text: 'Github',
            link: 'https://github.com/dreamforl/js-tools-function',
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          children: ['/guide/README.md', '/guide/getting-started.md'],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          children: ['/reference/cli.md', '/reference/config.md'],
        },
      ],
    },
  }),
  plugins: [searchPlugin({})],
  home: true,
}
