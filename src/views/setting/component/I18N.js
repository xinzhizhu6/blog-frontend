import React from "react"
import { useTranslation } from 'react-i18next'
import Options from "./Options"
import { TranslationOutlined } from "@ant-design/icons"
import { Select } from "antd"
import { useSelector } from "react-redux"
const { Option } = Select;
/**
 * 国际化设置
 * @returns {JSX.Element}
 */
function I18N() {
    const { t } = useTranslation()
    const lang = useSelector(state => state.setting.lang)

    const i18nOpts = [
        {
            icon: <TranslationOutlined />,
            title: t('settings.language'),
            name: 'lang',
            initialValue: lang,
            component: (
                <Select style={{ width: 160 }}>
                    <Option value="zh-CN">简体中文</Option>
                    <Option value="en-US">English</Option>
                </Select>
            )
        }
    ]
    return <Options heading={t('settings.i18n')} opts={i18nOpts} />
}

export default I18N