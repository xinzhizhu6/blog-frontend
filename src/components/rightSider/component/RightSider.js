import React from 'react'
import style from '../style/index.module.scss'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import config from '@/config'
import { Affix } from '@/components/base'
import IndividualPanel from "./IndividualPanel"
import AuthorPanel from './AuthorPanel'
import ArticleStatsPanel from './ArticleStatsPanel'

function InternalRightSider() {
    const opened = useSelector(state => state.sider.drawerOpened)
    const rightSiderCls = clsx(style.right_sider, opened && style.narrowing)

    const rightSiderRoutes = [
        {
            path: '/',
            component: (
                <Affix>
                    <IndividualPanel />
                </Affix>
            )
        },
        {
            path: '/about',
            component: (
                <Affix>
                    <IndividualPanel style={{ boxShadow: 'none' }} />
                </Affix>
            )
        },
        {
            path: '/article/:category/detail/:id',
            component: (
                <>
                    <AuthorPanel />
                    <Affix>
                        <ArticleStatsPanel />
                    </Affix>
                </>
            )
        },
    ]
    return (
        <React.Suspense fallback="loading" maxDuration={config.LOADING_DELAY}>
            <Routes>
                {rightSiderRoutes.map(({ path, component, ...rest }) => (
                    <Route key={path} exact path={path} {...rest} element={
                        <aside className={rightSiderCls}>{component}</aside>
                    }>
                    </Route>
                ))}
            </Routes>
        </React.Suspense>
    )
}

const RightSider = React.memo(InternalRightSider)
export default RightSider