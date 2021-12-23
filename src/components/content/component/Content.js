import React from 'react'
import { Routes, Redirect, Route } from 'react-router-dom'
import { GlobalLoading } from '@/components/base'
import config from '@/config'
import { Home } from "@/views/home"
import { ArticleCards } from "@/views/articleCards"
import { ArticleDetail } from '@/views/articleDetail'
import { ArticleUpload } from '@/views/articleUpload'
import { About } from "@/views/about"
import { Setting } from "@/views/setting"

const navRoutes = [
    {
        path: '/',
        component: <Home />
    },
    {
        path: '/article/:category/detail/:id',
        component: <ArticleDetail />
    },
    {
        path: '/article/:category',
        component: <ArticleCards />
    },
    {
        path: '/upload',
        component: <ArticleUpload />
    },
    {
        path: '/setting',
        component: <Setting />
    },
    {
        path: '/about',
        component: <About />
    },
    // {
    // 	path: '/404',
    // 	component: () => import('@/views/notFound/NotFound')
    // }
]
function Content() {
    return (
        <React.Suspense fallback={<GlobalLoading />} maxDuration={config.LOADING_DELAY}>
            <Routes>
                {navRoutes.map(({ path, component, ...rest }) => (
                    <Route key={path} exact path={path} element={component} {...rest} />
                ))}
                {/* <Redirect to="/404" /> */}
            </Routes>
        </React.Suspense>
    )
}
export default React.memo(Content)
