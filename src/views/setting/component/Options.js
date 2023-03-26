import { Form, List } from "antd";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import style from "../style/index.module.scss"
/**
 * 表单域
 * @param {{
 * 	className: string,
 * 	heading: string,
 * 	opts: ({
 * 		icon: JSX.Element,
 * 		title: string,
 * 		name: string,
 * 		component: JSX.Element
 * 	})[]
 * }} props
 * @returns
 */
function Options(props) {
    const { opts = [], heading, className } = props
    const containerCls = clsx(style.container, className)
    const theme = useSelector(state => state.setting.theme)

    const renderComponent = c => (typeof c === 'function' ? c() : c)

    const renderOption = opt => (
        opt.name ? (
            <Form.Item className={style.form_item} {...opt}>
                {renderComponent(opt.component)}
            </Form.Item>
        ) : (
            renderComponent(opt.component)
        )
    )

    return (
        <article className={style.options}>
            <h1>{heading}</h1>
            <List className={containerCls}>
                {opts.map((opt, index) => (
                    <List.Item key={index} className={style.list_item}>
                        <span>
                            {opt.icon && React.cloneElement(opt.icon, { className: style[`icon_${theme}`] })}
                            <span>{opt.title}</span>
                        </span>
                        {renderOption(opt)}
                    </List.Item>
                ))}
            </List>
        </article>
    )
}

export default React.memo(Options)