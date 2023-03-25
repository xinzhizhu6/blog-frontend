import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from '../style/index.module.scss'
import { Button, Progress, Affix } from "antd"
import { MenuOutlined } from "@ant-design/icons";
import Branch from "./Branch";
import Title from "./Title";
import Search from "./Search";
import AppCenter from "./AppCenter";
import UserProfile from "./UserProfile";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import { initUser, updateDrawer, updateModal } from "@/store/actions";
import { Login } from "@/components/modal";

export default function Header() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const topProgress = useSelector(state => state.topProgress)
    const online = useSelector(state => state.online)

    const handleShowDrawer = () => {
        dispatch(updateDrawer(true))
        localStorage.setItem('drawerOpened', true)
    }

    const handleGoLogin = () => {
        dispatch(updateModal(true, <Login />))
    }

    useEffect(() => {
        dispatch(initUser())
    }, [dispatch])

    const toolbarElement = (
        <div className={style.tool_bar}>
            <Search />
            <AppCenter />
            {
                online ? (
                    <UserProfile/> 
                ) : (
                    <Button type="primary" className={style.go_login} onClick={handleGoLogin}>
                        {t('header.login')}
                    </Button>
                )
            }

        </div>
    )

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