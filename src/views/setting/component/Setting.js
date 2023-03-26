import React from "react";
import { FlexiblePage } from "@/components/page";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"
import { Form } from "antd";
import style from "../style/index.module.scss"
import I18N from './I18N'
import Appearance from "./Appearance";
import Banner from './Banner'
import Editor from './Editor'
import { LoginOutlined } from "@ant-design/icons";
import { useScrollToTop } from "@/utils/hooks";
import { debounce } from "@/utils";
import { saveProfile, saveSetting, updateModal } from "@/store/actions";
import Account from "./Account";
import { Login } from "@/components/modal";
/**
 * 用户设置。
 * 分为两个表单：
 * 1.用户个人资料；
 * 2.系统设置；
 * 系统设置表单包括如下几部分（TODO:目前比较简陋，仅有几个关键的可配置项）：
 * - 用户个人信息
 * - UI
 * - 编辑器设置
 * - 国际化
 * @returns {JSX.Element}
 */
function Setting() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const online = useSelector(state => state.online)
    const profile = useSelector(state => state.userProfile)
    const theme = useSelector(state => state.setting.theme)

    useScrollToTop()
    const accountSaveInterval = 1000
    const settingSaveInterval = 400
    const [settingsForm] = Form.useForm()
    const [profileForm] = Form.useForm()

    const handleGoLogin = () => {
        dispatch(updateModal(true, <Login/> ))
    }

    const handleSaveSettings = settings => {
        dispatch(saveSetting(settings))
        Object.keys(settings).forEach(key => {
            localStorage.setItem(key, settings[key])
        })
    }

    const handleSaveProfile = async values => {
        console.log(values)
        const { github, phone, email, wechat } = values
        const profile = {
            ...values,
            contacts: { github, phone, email, wechat }
        }
        dispatch(saveProfile(profile))
    }
    return (
        <FlexiblePage className={style.setting_page}>
            {online || (
                <Banner theme={theme}>
                    <span>{t('settings.auto_sync')}</span>
                    <div onClick={handleGoLogin}>
                        <span>{t('settings.go_login')}</span>
                        <LoginOutlined />
                    </div>
                </Banner>
            )}
            {online && profile.username && (
                <Form
                    form={profileForm}
                    onFinish={handleSaveProfile}
                    onValuesChange={debounce(profileForm.submit, accountSaveInterval)}
                >
                    <Account form={profileForm} />
                </Form>
            )}
            <Form
                form={settingsForm}
                onFinish={handleSaveSettings}
                onValuesChange={debounce(settingsForm.submit, settingSaveInterval)}
            >
                <Appearance />
                <I18N />
                <Editor />
            </Form>
        </FlexiblePage>
    )
}

export default Setting