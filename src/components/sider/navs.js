import i18n from '@/common/i18n'
import { HomeFilled, EditFilled, HighlightFilled, SettingFilled, InfoCircleFilled } from '@ant-design/icons'

const getNavs = (t = i18n.t) => [
	{
		id: '0',
		level: 1,
		to: '',
		title: t('nav.home'),
		icon: <HomeFilled />
	},
	{
		id: '1',
		level: 1,
		to: '/article',
		title: t('nav.article_category'),
		icon: <EditFilled />,
		child: [
			{
				id: '10',
				level: 2,
				to: '/frontend',
				title: t('nav.frontend')
			},
			{
				id: '11',
				level: 2,
				to: '/mobile',
				title: t('nav.mobile')
			},
			{
				id: '12',
				level: 2,
				to: '/backend',
				title: t('nav.backend')
			},
			{
				id: '13',
				level: 2,
				to: '/computer_science',
				title: t('nav.computer_science')
			},
			{
				id: '14',
				level: 2,
				to: '/engineering',
				title: t('nav.engineering')
			}
		]
	},
	{
		id: '2',
		level: 1,
		to: '/upload',
		title: t('nav.write'),
		icon: <HighlightFilled />
	},
	{
		id: '3',
		level: 1,
		to: '/setting',
		title: t('nav.settings'),
		icon: <SettingFilled />
	},
	{
		id: '4',
		level: 1,
		to: '/about',
		title: t('nav.about'),
		icon: <InfoCircleFilled />
	}
]

export default getNavs
