import React, { useEffect, useState, useRef } from "react";
import { Button, Popover, Spin, Tabs } from "antd";
import { AppstoreOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next";
import style from "../style/index.module.scss";
import config from "@/config";
import { useFetch } from "@/utils/hooks";
import * as commonApi from '@/apis';
import { AspectRatio } from "@/components/base";

const { TabPane } = Tabs;

function LinkCard({ title, url, pic }) {
    const handleOpen = () => {
        setTimeout(() => {
            window.open(url)
        }, config.CLICK_DELAY);
    }
    return (
        <div className={style.outer} title={url}>
            <AspectRatio aspectRatio={1}>
                <div className={style.card_wrapper} onClick={handleOpen}>
                    <div className={style.inner}>
                        <img alt="" src={pic} />
                        <span>{title}</span>
                    </div>
                </div>
            </AspectRatio>

        </div>
    )
}

export default function AppCenter() {
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false)
    const fetched = useRef(false)

    const { data, loading, run: doFetch } = useFetch(commonApi.fetchUrls, {
        initialData: { docs: [], langs: [], tools: [] },
        loadingDelay: config.LOADING_DELAY,
        manual: true
    })

    useEffect(() => {
        if (visible && !fetched.current) {
            fetched.current = true
            doFetch()
        }
    }, [doFetch, visible])

    const renderCards = cards =>
        loading ? (
            <div className={style.loading_wrapper}>
                <Spin />
            </div>
        ) : (
            cards.map(card => <LinkCard key={card.title}  {...card} />)
        )



    const content = () => {
        return (
            <Tabs defaultActiveKey="docs" centered>
                <TabPane className={style.tab} tab={t('header.libary')} key="docs">
                    {renderCards(data.docs)}
                </TabPane>
                <TabPane className={style.tab} tab={t('header.lang')} key="langs">
                    {renderCards(data.langs)}
                </TabPane>
                <TabPane className={style.tab} tab={t('header.tool')} key="tools">
                    {renderCards(data.tools)}
                </TabPane>
            </Tabs>
        )
    }
    return (
        <>
            <Popover overlayClassName={style.app_center}
                content={content}
                trigger="click"
                visible={visible}
                onVisibleChange={visible => setVisible(visible)}>
                <Button className={style.btn} type="text" icon={<AppstoreOutlined />}></Button>
            </Popover>
        </>

    )
}