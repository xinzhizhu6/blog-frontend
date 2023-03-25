import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'

export default function FullScreenPage(props) {
	const { children, className } = props
	const pageCls = clsx(style.full_screen_page, className)
	return <section className={pageCls}>{children}</section>
}
