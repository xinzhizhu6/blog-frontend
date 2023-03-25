import React, { useEffect } from "react";
import { Branch } from '@/components/header'
import { Button } from "antd";
import style from "../style/index.module.scss"
import { ArrowLeftOutlined } from "@ant-design/icons";
import NavMenu from './NavMenu'
import { updateDrawer } from "@/store/actions";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { stringToBoolean } from "@/utils";

export default function Sider() {
    const dispatch = useDispatch()
    const drawerOpened = useSelector(state => state.sider.drawerOpened)

    const handleClose = () => {
        dispatch(updateDrawer(false))
        localStorage.setItem('drawerOpened', false)
    }

    useEffect(() => {
        dispatch(updateDrawer(stringToBoolean(localStorage.getItem("drawerOpened"))))
    }, [dispatch]);

    const asideCls = clsx(style.sider, {
        [style.open]: drawerOpened
    })
    return (
        <>
            <aside className={asideCls}>
                <div className={style.top}>
                    <Branch />
                    <Button className={style.drawer_control}
                        type="text" icon={<ArrowLeftOutlined />}
                        onClick={handleClose}
                    />
                </div>
                <NavMenu />
            </aside>
        </>
    )
}