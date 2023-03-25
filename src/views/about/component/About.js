import React from 'react'
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { Markdown } from '@/components/markdown'
import { useScrollToTop } from '@/utils/hooks'

const content = `
# 关于
**Hello**，我是一名web前端开发者。该博客是本人一个较为完整的个人项目。

搭建 Blog 主要是为了熟悉、打通 web 项目的整体流程，了解各端项目分工，实践所学技术、知识。  
亦能作为信息展示平台，记录个人所用所学、所见所闻、所感所想。一举多得。  

毕竟做 web 开发，特别是前端方面的知识体系分散且杂乱，技术推陈出新快。要想提升技术的广度与深度，养成良好的记笔记习惯非常重要。

当前开发进度：约 \`85%\`。

支持功能：

- 用户注册、登录 ✅
- 用户个人资料、配置项 编辑、同步 ✅
- markdown 文章展示 ✅
- markdown 编辑器、文章发布 ✅
- 用户详情页
- 关于页 ✅
- 响应式适配移动端 ✅
- 语言国际化 ✅
- 主题切换 ✅
- 用户、文章 搜索 ✅
- 文档入口 ✅
- 文章阅读数、点赞 ✅
- 文章评论 ✅
- 用户关注

[前端源码](https://github.com/pb0710/blog-frontend)：

- react（\`100%\` react hooks、suspense）
- react-router、redux、redux-saga、create-react-app
- 自建 [react 基础 ui 组件库](https://www.npmjs.com/package/sylas-react-ui)
- sass、axios、i18next、markdown-to-jsx

[后端源码](https://github.com/pb0710/blog-backend)：

- nodejs
- koa、koa-router、koa-swagger-decorator、koa-session、koa-static、koa-aysnc-busboy
- \`100%\` typescript 编写
- mysql
`

/**
 * 用 markdown 渲染，方便后续修改。并且可以和 README.md 同步。
 * @returns {JSX.Element}
 */
function About() {
	useScrollToTop()
	return (
		<FlexiblePage className={style.about_page}>
			<article className={style.about_wrapper}>
				<Markdown>{content}</Markdown>
			</article>
		</FlexiblePage>
	)
}

export default About
