import React, { useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import Options from "./Options"
import style from '../style/index.module.scss'
import { Button, Input, Select, Upload } from "antd"
import clsx from "clsx"
import { SmileOutlined, UserOutlined, IdcardOutlined, TeamOutlined, GithubOutlined, MailOutlined, PhoneOutlined, WechatOutlined, MessageOutlined } from "@ant-design/icons"
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import { saveProfile, updateUserProfile, userLogout } from "@/store/actions"
import * as fileApi from '@/apis/file'
import { msg } from "@/components/base"
const { Option } = Select
const { TextArea } = Input
/**
 * 用户个人资料
 * @returns {JSX.Element}
 */
function Account() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const profile = useSelector(state => state.userProfile)
    const theme = useSelector(state => state.setting.theme)
    const { username, nickname, avatar, gender, selfIntroduction, contacts } = profile
    const avatarRef = useRef()

    const handleLogout = () => {
        dispatch(userLogout())
    }

    const handleChangeAvatar = useCallback(
        async (e) => {
            console.log(e)
            let formData = new FormData()
            formData.append('userId', profile.userId)
            formData.append("image", e.target.files[0])
            try {
                const avatar = await fileApi.uploadImage(formData)
                console.log(avatar)
                dispatch(
                    updateUserProfile({
                        ...profile,
                        avatar
                    })
                )
                dispatch(saveProfile({ ...profile,avatar }))
            } catch (err) {
                msg.error(`${t('error.upload')} ${err}`)
            }
        },
        [dispatch, profile, t]
    )
    const handleClick = () => {
        console.log(avatarRef)
        avatarRef.current.click()
    }
    const usernameOptCls = clsx(style.option, style.username_wrapper)
    const avatarOptCls = clsx(style.option, style[`avatar_wrapper_${theme}`])
    const btnCls = style[`btn_${theme}`]

    const accountOpts = [
        {
            icon: <SmileOutlined />,
            title: t('settings.profile.username'),
            component: (
                <div className={usernameOptCls}>
                    <span>{username ?? t('settings.profile.not_login')}</span>
                    <Button className={btnCls} onClick={handleLogout}>
                        {t('settings.profile.logout')}
                    </Button>
                </div>
            )
        },
        {
            icon: <UserOutlined />,
            title: t('settings.profile.nickname'),
            name: 'nickname',
            initialValue: nickname,
            rules: [
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (value.length < 2) {
                            return Promise.reject(t('settings.profile.rule.nickname_length_limit'))
                        }
                        else {
                            return Promise.resolve();
                        }
                    }
                })
            ],
            component: <Input placeholder={t('settings.profile.your_name')} />
        },
        {
            icon: <IdcardOutlined />,
            title: t('settings.profile.avatar'),
            // name: 'avatar',
            initialValue: avatar,
            component: (
                // <Upload 
                //     multiple={false}
                //     withCredentials={true}
                //     action={`${config.BASE_URL}/file/upload_image`}
                //     name="image"
                //     data={{ 'userId': profile.userId }}
                // >
                //     <div className={avatarOptCls}>
                //         <img src={avatar || defaultAvatar} alt="" />
                //     </div>
                // </Upload>
                <div className={avatarOptCls} onClick={handleClick}>
                    <img src={avatar || defaultAvatar} alt="" />
                    <input ref={avatarRef} type="file" multiple={false} onChange={handleChangeAvatar}></input>
                </div>
            )
        },
        {
            icon: <TeamOutlined />,
            title: t('settings.profile.gender'),
            name: 'gender',
            initialValue: gender,
            component: (
                <Select>
                    <Option value="male">{t('settings.profile.male')}</Option>
                    <Option value="female">{t('settings.profile.female')}</Option>
                </Select>
            )
        },
        {
            icon: <MessageOutlined />,
            title: t('settings.profile.self_introduction'),
            name: 'selfIntroduction',
            initialValue: selfIntroduction,
            component: <TextArea placeholder={t('settings.profile.skills_and_hobbies')} style={{ width: '24rem', resize: 'none' }} />
        },
        {
            icon: <GithubOutlined />,
            title: t('settings.profile.github'),
            name: 'github',
            initialValue: contacts.github ?? '',
            component: <Input style={{ width: '24rem' }} />
        },
        {
            icon: <MailOutlined />,
            title: t('settings.profile.email'),
            name: 'email',
            initialValue: contacts.email ?? '',
            component: <Input style={{ width: '24rem' }} />
        },
        {
            icon: <PhoneOutlined />,
            title: t('settings.profile.phone'),
            name: 'phone',
            initialValue: contacts.phone ?? '',
            component: <Input style={{ width: '24rem' }} />
        },
        {
            icon: <WechatOutlined />,
            title: t('settings.profile.wechat'),
            name: 'wechat',
            initialValue: contacts.wechat ?? '',
            component: <Input style={{ width: '24rem' }} />
        }
    ]

    return <Options className={style.account} heading={t('settings.profile.heading')} opts={accountOpts} />
}
export default Account