import React from "react";
import { FlexiblePage } from "@/components/page";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next"
import { Form } from "antd";
import style from "../style/index.module.scss"
import I18N from './I18N'
import Banner from './Banner'
import Editor from './Editor'
import { LoginOutlined } from "@ant-design/icons";
import { useScrollToTop } from "@/utils/hooks";
import { debounce } from "@/utils";
import { saveSetting } from "@/store/actions";

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
    const online = useSelector(state => {console.log(state); return state.online})
	const profile = useSelector(state => state.userProfile)

	useScrollToTop()
    const accountSaveInterval = 1000
	const settingSaveInterval = 400
	const [settingsForm] = Form.useForm()


    const handleSaveSettings = settings => {
        console.log(settings)
        dispatch(saveSetting(settings))
        Object.keys(settings).forEach(key => {
            localStorage.setItem(key, settings[key])
        })
    }
    return (
        <FlexiblePage className={style.setting_page}>
            {online || (
                <Banner >
                    <span>{t('settings.auto_sync')}</span>
                    <div>
                        <span>{t('settings.go_login')}</span>
                        <LoginOutlined />
                    </div>
                </Banner>
            )}
            <Form
                form={settingsForm}
				onFinish={handleSaveSettings}
				onValuesChange={debounce(settingsForm.submit, settingSaveInterval)}
            >
                <I18N />
                <Editor />
            </Form>
        </FlexiblePage>
    )
}

export default Setting