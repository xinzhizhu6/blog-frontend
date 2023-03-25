import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'
import { useSelector } from 'react-redux'

export default function FlexiblePage(props) {
    const { children, className, fullWidth } = props
    const opened = useSelector(state => state.sider.drawerOpened)
    const pageCls = clsx(style.flexible_page, className, opened && style.narrowing)
    const containerCls = fullWidth ? style.full_width : style.container
    return (
        <section className={pageCls}>
            <div className={containerCls}>
                {children}
            </div>
        </section>
    )
}