import React from 'react'
import style from '../style/index.module.scss'
import { MarkdownEditor } from '@/components/markdown'
import { FlexiblePage } from '@/components/page'

/**
 * 文章编写、发布页面
 * @returns {JSX.Element}
 */
export default function ArticleUpload() {
	return (
		<FlexiblePage className={style.article_upload_page} fullWidth>
			<MarkdownEditor />
		</FlexiblePage>
	)
}
