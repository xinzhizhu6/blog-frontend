import React, { useEffect, useState } from "react"
import { Menu } from 'antd'
import style from "../style/index.module.scss"
import getNavs from '../navs'
import { useTranslation } from "react-i18next"
import { NavLink, matchPath, useLocation } from "react-router-dom"
const { SubMenu } = Menu


/**
 * @param {{
 * 	id: number,
 *	level: number,
 *	to: string,
 *	title: string,
 *	icon: JSX.Element
 * }} props
 * @returns
 */
function InternalNav(props) {
    const { id, level, to, title, icon } = props

    return (
        <Menu.Item className={style[`level${level}`]}
            icon={icon}
            key={id}
        >
            <NavLink to={to} key={id}>
                {title}
            </NavLink>

        </Menu.Item>
    )
}

const Nav = React.memo(InternalNav)

export default function NavMenu() {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const [currentKey, setCurrentKey] = useState("0")
    const [openKey, setOpenKey] = useState([])
    useEffect(() => {
        function selectMenu(nav) {
            if (nav.to === '') setCurrentKey("0")
            else {
                const match = pathname.includes(nav.to) 
                nav.fatherId && setOpenKey([nav?.fatherId])
                match && setCurrentKey(nav.id) 
            }

        }
        getNavs(t).map(nav => {
            nav.child ?
                nav.child.map(child => {
                    const to = nav.to + child.to
                    const fatherId = nav.id
                    selectMenu({ ...child, to, fatherId })
                })
                : selectMenu(nav)
        })
    }, [pathname, t])

    const onOpenChange = keys => {
        setOpenKey(keys)
    }

    return (
        <Menu className={style.menu}
            selectedKeys={[currentKey]}
            openKeys={openKey}
            onOpenChange={onOpenChange}
            mode="inline"
        >
            {
                getNavs(t).map(nav => (
                    nav.child ? (
                        <SubMenu key={nav.id}
                            className={style.level1}
                            title={nav.title}
                            icon={nav.icon}
                        >
                            {nav.child.map(child => {
                                child = { ...child, to: `${nav.to}${child.to}` }
                                return (
                                    <Menu.Item className={style[`level${child.level}`]}
                                        icon={child.icon}
                                        key={child.id}
                                    >
                                        <NavLink to={child.to}>
                                            {child.title}
                                        </NavLink>

                                    </Menu.Item>
                                )
                            })}
                        </SubMenu>
                    ) : (
                        <Menu.Item className={style[`level${nav.level}`]}
                            icon={nav.icon}
                            key={nav.id}
                        >
                            <NavLink to={nav.to}>
                                {nav.title}
                            </NavLink>

                        </Menu.Item>
                    )
                ))
            }
        </Menu>

    )
}