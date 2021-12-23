import React from 'react'
import style from '../style/index.module.scss'

/**
 * 页面顶部提示
 * @param {{
 * 	children: JSX.Element,
 * }} props
 * @returns {JSX.Element}
 */
function InternalBanner(props) {
	const { children } = props
	return <article className={style.banner}>{children}</article>
}

const Banner = React.memo(InternalBanner)
export default Banner
