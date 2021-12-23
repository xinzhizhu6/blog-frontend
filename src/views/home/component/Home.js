import React from "react"
import style from '../style/index.module.scss'
import { FlexiblePage } from '@/components/page'
import { Panel } from '@/components/base'
import { Tabs } from "antd";
import { useTranslation } from 'react-i18next'
import ArticleList from "./ArticleList"
import { useScrollToTop } from "@/utils/hooks";

const { TabPane } = Tabs;

function Home() {
    const { t } = useTranslation()
    useScrollToTop()
    
    const tabList = [
        { key: 'latest', title: t('home.latest') },
        { key: 'popular', title: t('home.popular') },
        { key: 'random', title: t('home.random') }
    ]
    return (
        <FlexiblePage className={style.home_page}>
            <article className={style.home_wrapper}>
                <Panel className={style.list_wrapper}>
                    <Tabs defaultActiveKey="latest"  centered>
                        {tabList.map(({ key, title }) => (
                            <TabPane  tab={title} key={key}>
                                <ArticleList sortBy={key} />
                            </TabPane>
                        ))}
                    </Tabs>
                </Panel>
            </article>
        </FlexiblePage>
    )
}

export default Home