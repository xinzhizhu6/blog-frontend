import React from "react"
import style from '../style/index.module.scss'
import clsx from 'clsx'

/**
 * 半固定区域，使用 sticky 定位
 * @param {{
 *	children: JSX.Element,
 *	className: string,
 *	rest: any[]
 * }} props
 * @returns
 */

function InternalAffix(props) {
    const {children ,className, ...rest} = props
    const affixCls = clsx(style.affix, className)
    return (
        <section className={affixCls} {...rest}>
            {children}
        </section>
    )
}

const Affix = React.memo(InternalAffix)
export default Affix