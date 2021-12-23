import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'

/**
 * @param {{
 * 	children: JSX.Element,
 * 	className: string,
 * 	rest: any[]
 * }} props
 * @returns
 */
function Panel(props) {
	const { children, className, ...rest } = props
	const panelCls = clsx(style.panel, className)
	return (
		<section className={panelCls} {...rest}>
			{children}
		</section>
	)
}

export default Panel
