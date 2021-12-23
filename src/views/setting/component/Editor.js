import React from "react"
import { useTranslation } from 'react-i18next'
import Options from "./Options"
import { FileMarkdownOutlined } from "@ant-design/icons"
import { Switch } from "antd"
import { useSelector } from "react-redux"
/**
 * 编辑器设置
 * @returns {JSX.Element}
 */
function Editor() {
    const { t } = useTranslation()
	const useMarkdownGuide = useSelector(state => state.setting.useMarkdownGuide)

    const editorOpts = [
        {
            icon: <FileMarkdownOutlined />,
            title: t('settings.show_markdown_guide'),
            name: 'useMarkdownGuide',
            initialValue: useMarkdownGuide,
            component: <Switch defaultChecked={useMarkdownGuide} />,
            valuePropName: "checked"
        }
    ]
	return <Options heading={t('settings.article')} opts={editorOpts} />
}

export default Editor