import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Divider } from 'antd'
import style from '../style/index.module.scss'
import { CommentOutlined } from '@ant-design/icons'
/**
 * 评论区：
 * - 编写评论
 * - 评论列表
 * @returns {JSX.Element}
 */
function Comments() {
    const { t } = useTranslation()

    const handleGoLogin = () => {

    }

    return (
        <div className={style.comments_wrapper}>

            <div className={style.go_login_wrapper}>
                <span>
                    <CommentOutlined />
                    <strong>{t('article_detail.after_login')}</strong>
                </span>
                <Button type="primary" onClick={handleGoLogin}>
                    {t('article_detail.go_login')}
                </Button>
            </div>
        </div>
    )
}

export default Comments