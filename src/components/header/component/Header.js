import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from '../style/index.module.scss'
import { Button, Progress, Affix } from "antd"
import { MenuOutlined } from "@ant-design/icons";
import Branch from "./Branch";
import Title from "./Title";
import Search from "./Search";
import AppCenter from "./AppCenter";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import { updateDrawer } from "@/store/actions";


export default function Header() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const topProgress = useSelector(state => state.topProgress)
    const toolbarElement = (
        <div className={style.tool_bar}>
            <Search />
            <AppCenter />
            <Button type="primary" className={style.go_login}>
                {t('header.login')}
            </Button>
        </div>
    )

    const handleShowDrawer = () => {
		dispatch(updateDrawer(true))
		localStorage.setItem('drawerOpened', true)
    }


    return (
        <>
            <Progress percent={topProgress}
                className={clsx(style.progress_bar, {
                    [style.hide]: topProgress === 0
                })}
                showInfo={false}
                strokeWidth="2px" />

            <header className={style.header}>
                <Button type="text" className={style.drawer_control} icon={<MenuOutlined />}
                    onClick={handleShowDrawer} />
                <Branch />
                <Title />
                {toolbarElement}
            </header>
        </>
    )
}