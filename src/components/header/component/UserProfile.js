import React, { useState } from 'react'
import style from '../style/index.module.scss'
import { Button, Popover, Divider } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function UserProfile() {
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false)
    const theme = useSelector(state => state.setting.theme)

    const { avatar, nickname, username } = useSelector(state => state.userProfile)

    const handleSignOut = () => {

    }
    const content = () => {
        return (
            <>
                <Link to="/">
                    <div className={style.large_avatar}>
                        <img src={avatar} alt="" />
                    </div>
                </Link>
                <Link to="/">
                    <h3 className={style[`nickname_${theme}`]} >{nickname}</h3>
                </Link>
                <span>{username}</span>
                <Divider className={style.divider} />
                <Button type='primary' onClick={handleSignOut}>
                    {t('header.logout')}
                </Button>
            </>
        )
    }

    return (
        <>
            <Popover overlayClassName={style.user_profile}
                content={content}
                trigger="click"
                visible={visible}
                onVisibleChange={visible => setVisible(visible)}
            >
                <img className={style.user_avatar} src={avatar} alt="" />
            </Popover>
        </>
    )

}
