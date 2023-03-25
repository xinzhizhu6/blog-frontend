import React from 'react'
import Options from './Options'
import { Select } from "antd"
import { BgColorsOutlined } from "@ant-design/icons"
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const { Option } = Select;

/**
 * UI设置
 * @returns {JSX.Element}
 */
function Appearance() {
	const { t } = useTranslation()
	const theme = useSelector(state => state.setting.theme)
	const appearanceOpts = [
		{
			icon: <BgColorsOutlined />,
			title: t('settings.theme'),
			name: 'theme',
			initialValue: theme,
			component: (
				<Select defaultValue={theme} style={{ width: 160 }}>
					<Option value="primary">{t('settings.primary')}</Option>
					<Option value="success">{t('settings.success')}</Option>
					<Option value="warning">{t('settings.warning')}</Option>
					<Option value="error">{t('settings.error')}</Option>
				</Select>
			)
		}
	]
	return <Options heading={t('settings.appearance')} opts={appearanceOpts} />
}

export default Appearance
