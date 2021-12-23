import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'

export default function StablePage(props) {
	const { children, className } = props
	const pageCls = clsx(style.stable_page, className)
	return <section className={pageCls}>{children}</section>
}
