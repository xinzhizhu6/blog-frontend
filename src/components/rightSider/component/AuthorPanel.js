import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel, Skeleton } from '@/components/base'
import { List,Divider } from 'antd'
import { GithubOutlined, WechatOutlined, MailOutlined, PhoneFilled } from '@ant-design/icons'
import clsx from 'clsx'
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import { useTranslation } from 'react-i18next'
import Contact from './Contact'

export default function AuthorPanel() {
    const { t } = useTranslation()
    const authorProfile = useSelector(state => state.articleAuthorProfile)
    const { nickname, avatar, contacts } = authorProfile
    const hasContacts = typeof contacts === 'object' && Object.values(contacts).filter(Boolean).length > 0

    const contactsElement = hasContacts && (
        <>
            <Divider />
            <div className={style.contact_wrapper}>
                {contacts.github && (
                    <Contact link={contacts.github}>
                        <GithubOutlined />
                    </Contact>
                )}
                {contacts.wechat && (
                    <Contact link={contacts.wechat}>
                        <WechatOutlined />
                    </Contact>
                )}
                {contacts.email && (
                    <Contact link={contacts.email}>
                        <MailOutlined />
                    </Contact>
                )}
                {contacts.phone && (
                    <Contact link={contacts.phone}>
                        <PhoneFilled />
                    </Contact>
                )}
            </div>
        </>
    )
    const avatarItemCls = clsx(style.item, style.name_wrapper)
    return (
        <Panel className={style.author_panel}>
            <List>
                <List.Item className={avatarItemCls}>
                    <div className={style.avatar}>
                        <img src={avatar ?? defaultAvatar} alt="" />
                    </div>
                    <div className={style.right_wrapper}>
                        <strong className={style.name}>{nickname || <Skeleton />}</strong>
                    </div>
                </List.Item>
            </List>
            {contactsElement}
        </Panel>
    )
}