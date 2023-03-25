import React from 'react'
import style from '../style/index.module.scss'
import { useSelector } from 'react-redux'
import { Panel, Skeleton } from "@/components/base"
import { Divider, List, Tag } from "antd"
import { GithubOutlined, WechatOutlined, MailOutlined, PhoneFilled } from '@ant-design/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFetch } from '@/utils/hooks'
import * as userApi from '@/apis/user'
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import { useTranslation } from 'react-i18next'
import config from '@/config'
import Contact from "./Contact"

export default function IndividualPanel(props) {
    const { t } = useTranslation()
    const { username = 'xx@163.com' } = useSelector(state => state.userProfile)

    const { data, loading } = useFetch(async () => userApi.fetchProfile(username), {
        initialData: {},
        loadingDelay: config.LOADING_DELAY,
        ready: !!username,
        refreshDeps: [username]
    })
    const { nickname, avatar, contacts } = data
    const hasContacts = typeof contacts === 'object' && Object.values(contacts).filter(Boolean).length > 0

    const contactsElement = hasContacts ? (
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
    ) : null
    
    const tagsElement =
        username === 'xx@163.com' ? (
            <>
                <Divider />
                <div className={style.tags_wrapper}>
                    <Tag color="#f56c6c">{t('home.frontend')}</Tag>
                    <Tag color="#e6a23c">Developer</Tag>
                    <Tag color="#409eff">React</Tag>
                    <Tag color="#67c23a">NodeJS</Tag>
                    <Tag color="#f56c6c">Sass</Tag>
                    <Tag color="#409eff">Typescript</Tag>
                </div>
            </>
        ) : null

    const avatarItemCls = clsx(style.item, style.name_wrapper)
    return (
        <Panel className={style.individual_panel} {...props}>
            <List>
                <Link to="/">
                    <List.Item className={avatarItemCls}>
                        <div className={style.avatar}>{loading ? null : <img src={avatar ?? defaultAvatar} />}</div>
                        <div className={style.bottom_wrapper}>
                            <h2 className={style.name}>{nickname || <Skeleton />}</h2>
                        </div>
                    </List.Item>
                </Link>
            </List>
            {contactsElement}
            {tagsElement}
        </Panel>
    )
}