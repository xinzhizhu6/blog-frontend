import { Button, Input, Popover, Divider, List, Spin } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { SearchOutlined, RightOutlined } from "@ant-design/icons"
import style from "../style/index.module.scss"
import { useTranslation } from "react-i18next";
import { useFetch } from "@/utils/hooks";
import * as commonApi from '@/apis'
import config from "@/config";
import { Link } from "react-router-dom";
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import { debounce } from "@/utils";

export default function Search() {
    const { t } = useTranslation()
    const [visible, setVisible] = useState(false)
    const ref = useRef()
    const inputing = useRef(false);
    const initialData = useRef({ users: [], articles: [] }).current
    const { data, loading, run: doSearch, mutate } = useFetch(commonApi.search, {
        initialData,
        loadingDelay: config.LOADING_DELAY,
        manual: true
    })
    const notResult = data.articles.length === 0 && data.users.length === 0

    const handleSearch = async (event) => {
        const keywords = event.target.value
        if (!keywords) {
            mutate(initialData)
            return
        }
        if (!/^[a-z0-9]+$/i.test(keywords) && inputing.current) {
            return
        }
        doSearch(keywords)
    }

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                ref.current?.focus?.()
            }, 200);
            mutate(initialData)
        }
    }, [visible, initialData, mutate])

    const searchInputElement = (
        <div className={style.search_input_wrapper}>
            <Input
                ref={ref}
                onChange={debounce(handleSearch,500)}
                placeholder={t('header.search_placeholder')}
                onCompositionStart={() => {
                    inputing.current = false
                }}
                onCompositionEnd={() => {
                    inputing.current = true
                }}
            />
        </div>
    )

    const usersElement = data.users.length > 0 && (
        <>
            <Divider orientation="left">{t('header.user')} </Divider>
            <List
                dataSource={data.users}
                renderItem={({ id, avatar, nickname }) =>
                    <Link key={id} to="/">
                        <List.Item className={style.user_item} onClick={() => setVisible(false)}>
                            <img alt="" src={avatar || defaultAvatar} />
                            <span className={style.text}>{nickname}</span>
                        </List.Item>
                    </Link>
                }
            >
            </List>
        </>
    )

    const articlesElement = data.articles.length > 0 && (
        <>
            <Divider orientation="left">{t('header.article')} </Divider>
            <List
                dataSource={data.articles}
                renderItem={({ id, title, category }) =>
                    <Link key={id} to={`/article/${category}/detail/${id}`}>
                        <List.Item className={style.article_item} onClick={() => setVisible(false)}>
                            <span className={style.text}>{title}</span>
                            <RightOutlined />
                        </List.Item>
                    </Link>
                }>
            </List>
        </>
    )

    const content = () => (
        <>
            {searchInputElement}
            {loading ? (
                <div className={style.loading_wrapper}>
                    <Spin />
                </div>
            ) : (
                <div className={style.result_wrapper}>
                    {notResult && <h1>{t('header.no_data')}</h1>}
                    {usersElement}
                    {articlesElement}
                </div>
            )}
        </>
    )

    return (
        <Popover overlayClassName={style.search}
            content={content}
            trigger="click"
            visible={visible}
            onVisibleChange={visible => setVisible(visible)}
            destroyTooltipOnHide={true}
        >
            <Button type="text" className={style.btn} icon={<SearchOutlined />}></Button>
        </Popover>
    )
}