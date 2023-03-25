import React from 'react'
import { useMediaQuery, useScroll } from '@/utils/hooks'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import style from '../style/index.module.scss'
import config from '@/config'

function Title() {
    const { title } = useSelector(state => state.articleDetail)
    const drawerOpened = useSelector(state => state.sider.drawerOpened)
    const { top } = useScroll(document, { debounceDuration: config.SCROLL_DURATION })
	const isMobile = useMediaQuery('(max-width:600px)')
    const titleWrapperCls = clsx(style.article_title, {
        [style.open]: drawerOpened
    })

    const headingCls = clsx({
        [style.show]:  top > document.body.clientHeight
    })

    return (
        isMobile || (
            <div className={titleWrapperCls}>
                <h2 className={headingCls}>{title}</h2>
            </div>
        )
    )
}

export default Title
