import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as articleApi from '@/apis/article'
import * as fileApi from '@/apis/file'
import { updateModal } from '@/store/actions'
import style from '../style/index.module.scss'
import defaultArticleBg from '@/assets/images/default_article_bg.png'
import { Button, Form, Input, Select } from 'antd'
import { CloseOutlined, FileAddOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useBoolean } from '@/utils/hooks'
import dayjs from 'dayjs'
import { msg } from '@/components/base'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { TextArea } = Input
/**
 * 文字发布时需填写的信息。
 * 包括：
 * - 标题
 * - 背景图
 * - 描述
 * - 分类
 * @param {{content: string}} props
 * @returns {JSX.Element}
 */
function ArticleInfo(props) {
    const { content } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userId } = useSelector(state => state.userProfile)
    const [visible, { setTrue: handleShowCover, setFalse: handleHideCover }] = useBoolean(false)
    const [picSrc, setPicSrc] = useState(defaultArticleBg)
    const picRef = useRef()

    const handleClose = useCallback(() => {
        dispatch(updateModal(false, null))
    }, [dispatch])

    const handleClickPic = useCallback(
        () => {
            picRef.current.click()
        }, [picRef])

    const handleAddPic = useCallback(
        async (e) => {
            let formData = new FormData()
            formData.append("userId", userId)
            formData.append("image", e.target.files[0])
            try {
                const remotePicUrl = await fileApi.uploadImage(formData)
                setPicSrc(remotePicUrl)
                return remotePicUrl
            } catch (err) {
                console.error(`图片上传失败 ${err}`)
                msg.error(t('error.upload'))
            }
        }, [])

    const handleAddArticle = useCallback(
        async (values) => {
            const { category, title, introduce, tags } = values
            const articleDetail = {
                content,
                category,
                title,
                tags,
                introduce,
                backgroundImage: picSrc,
                creationTime: dayjs().valueOf()
            }
            try {
                await articleApi.addArticle(userId, articleDetail)
                handleClose()
                navigate('/')
                msg.success(t('success.add'))
            } catch (err) {
                console.error('添加文章失败', err)
                msg.error(t('error.add'))
            }
        }, [content, handleClose, navigate, t, userId, picSrc])

    const formItems = [
        {
            name: "pic",
            initialValue: picSrc,
            component: (
                <div className={style.center_wrapper}>
                    <div
                        className={style.pic_wrapper}
                        onMouseEnter={handleShowCover}
                        onMouseLeave={handleHideCover}
                        onClick={handleClickPic}
                    >
                        <div className={style.pic_cover}>
                            <FileAddOutlined style={{ color: visible ? '#fff' : 'transparent','fontSize': "30px" }} />
                        </div>
                        <img className={style.title_pic} src={picSrc} alt="" />
                    </div>
                    <input ref={picRef} type="file" multiple={false} onChange={handleAddPic} />
                </div>
            )
        },
        {
            name: "title",
            initialValue: "",
            relues: [
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (value.length < 6 || value.length > 36) {
                            return Promise.reject(t('article_publish.rule.title_length_limit'))
                        }
                        else {
                            return Promise.resolve();
                        }
                    }
                })
            ],
            component: (<Input placeholder={t('article_publish.title')} />)
        },
        {
            name: "category",
            initialValue: "frontend",
            label: t('article_publish.category'),
            component: (
                <Select>
                    <Option value="frontend">{t('category.frontend')}</Option>
                    <Option value="backend">{t('category.backend')}</Option>
                    <Option value="mobile">{t('category.mobile')}</Option>
                    <Option value="computer_science">{t('category.computer_science')}</Option>
                    <Option value="engineering">{t('category.engineering')}</Option>
                </Select>
            )
        },
        {
            name: "tags",
            component: (
                <Select mode='tags' placeholder={t('article_publish.tags')}>
                    <Option value="React">React</Option>
                    <Option value="Vue">Vue</Option>
                    <Option value="Angular">Angular</Option>
                    <Option value="Webpack">Webpack</Option>
                    <Option value="Node">Node</Option>
                    <Option value="Nginx">Nginx</Option>
                    <Option value='Html'>Html</Option>
                    <Option value="Css">Css</Option>
                    <Option value="JavaScript">JavaScript</Option>
                </Select>
            )
        },
        {
            name: 'introduce',
            initialValue: '',
            relues: [
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (value.length > 150) {
                            return Promise.reject(t('article_publish.rule.introduce_length_limit'))
                        }
                        else {
                            return Promise.resolve();
                        }
                    }
                })
            ],
            component: (<TextArea placeholder={t('article_publish.introduce')} />)
        }
    ]


    return (
        <div className={style.article_info}>
            <h1>{t('article_publish.add_article')}</h1>
            <Button className={style.close} type="text" icon={<CloseOutlined />} onClick={handleClose}></Button>
            <Form onFinish={handleAddArticle}>
                {formItems.map(item => (
                    <Form.Item key={item.name} {...item}>
                        {item.component}
                    </Form.Item>
                ))}
                <div className={style.center_wrapper}>
                    <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
                        {t('article_publish.publish')}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ArticleInfo
