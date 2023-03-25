import React, { useCallback } from 'react'
import style from '../style/index.module.scss'
import { msg, Panel } from '@/components/base'
import { List } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { LikeOutlined, LikeFilled, FileAddOutlined, EyeOutlined, CommentOutlined } from '@ant-design/icons'

function ArticleStatsPanel() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { userId } = useSelector(state => state.userProfile)
    const detail = useSelector(state => state.articleDetail)
    const { id: articleId, likes = [], views = 0, reviews = [] } = detail
    const theme = useSelector(state => state.setting.theme)

    const liked = likes.some(item => String(item) === String(userId))
    console.log(detail)
    return (
        <Panel className={style[`article_stats_panel_${theme}`]}>
            <List>
                <List.Item className={clsx(style.item, { [style.actived]: liked })} >
                    {liked ? <LikeFilled /> : <LikeOutlined />}
                    {t('article_detail.likes')}
                    <strong>{likes.length}</strong>
                </List.Item>
                <List.Item className={style.item} >
                    <FileAddOutlined />
                    {t('article_detail.collections')}
                    <strong>0</strong>
                </List.Item>
                <List.Item className={style.item}>
                    <EyeOutlined />
                    {t('article_detail.views')}
                    <strong>{views}</strong>
                </List.Item>
                <List.Item className={style.item}>
                    <CommentOutlined />
                    {t('article_detail.reviews')}
                    <strong>{reviews.length}</strong>
                </List.Item>
            </List>
        </Panel >
    )
}

export default ArticleStatsPanel