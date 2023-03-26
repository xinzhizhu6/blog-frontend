import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Divider, Input } from 'antd'
import style from '../style/index.module.scss'
import { CommentOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Login } from '@/components/modal'
import { updateModal } from '@/store/actions'
import { useFetch } from '@/utils/hooks'
import * as articleApi from '@/apis/article'
import config from '@/config'
import Reviews from './Reviews'
import { msg } from '@/components/base'
const { TextArea } = Input
/**
 * 文章评论发表
 * @param {{
 * 	mutate: boolean,
 * 	content: string,
 * 	setContent: React.Dispatch<React.SetStateAction<string>>
 * }} props
 * @param {React.MutableRefObject<any>} ref
 * @returns {JSX.Element}
 */
function InternalAddComment(props, ref) {
    const { mutate, content, setContent } = props
    const { t } = useTranslation()
    const { id: articleId } = useParams()
    const { userId } = useSelector(state => state.userProfile)

    const handleComment = async () => {
        if (content.length < 8) {
            msg.error(t('article_detail.rule.content_length_limit'))
            return
        }
        try {
            const payload = await articleApi.comment({ userId, articleId, content })
            mutate(oldReviews => [payload, ...oldReviews])
            setContent('')
            msg.success(t('success.comment'))
        } catch (err) {
            msg.error(t('error.comment'))
        }
    }
    return (
        <div className={style.add_review_wrapper}>
            <h3>{t('article_detail.add_review')}</h3>
            <TextArea ref={ref} value={content} onChange={(e) => setContent(e.target.value)} />
            <div className={style.footer}>
                <Button onClick={handleComment}>
                    {t('article_detail.add')}
                </Button>
            </div>
        </div>
    )
}
const AddComment = React.forwardRef(InternalAddComment)

/**
 * 评论区：
 * - 编写评论
 * - 评论列表
 * @returns {JSX.Element}
 */
function Comments() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const online = useSelector(state => state.online)
    const { id: articleId } = useParams()
    const [content, setContent] = useState('')
    const textareaRef = useRef()
    const { data, mutate } = useFetch(async () => articleApi.fetchReviewList(articleId), {
        initialData: [],
        loadingDelay: config.LOADING_DELAY,
        ready: articleId != null,
        refreshDeps: [articleId]
    })

    const handleGoLogin = () => {
        dispatch(updateModal(true, <Login />))
    }

    const handleQuote = useCallback(
        ({ speaker, content }) => {
            if (!online) {
                handleGoLogin()
                return
            }
            const divider = `----------------------------------------------------------------------`
            setContent(`${speaker.nickname || t('article_detail.anonymous_user')} : ${content.trim()}  \n${divider}  \n`)
            textareaRef.current?.focus()
        }, [handleGoLogin, online, t])

    return (
        <div className={style.comments_wrapper}>
            {
                online ? (
                    <AddComment ref={textareaRef} mutate={mutate} content={content} setContent={setContent} />
                ) : (
                    <div className={style.go_login_wrapper}>
                        <span>
                            <CommentOutlined />
                            <strong>{t('article_detail.after_login')}</strong>
                        </span>
                        <Button type="primary" onClick={handleGoLogin}>
                            {t('article_detail.go_login')}
                        </Button>
                    </div>
                )
            }
            <Divider />
            <Reviews sourceData={data} handleQuote={handleQuote} />
        </div>
    )
}

export default Comments