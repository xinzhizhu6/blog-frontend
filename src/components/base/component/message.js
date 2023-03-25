import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import style from '../style/index.module.scss'
import { v4 as uuid } from 'uuid'
import clsx from 'clsx'
import { CheckCircleFilled, ExclamationCircleFilled, CloseCircleFilled,InfoCircleFilled } from "@ant-design/icons"

// 组件的 add 方法需要对外暴露
let add

function MessageContainer() {
    // { id, content, type, duration }
    const [msgList, setMsgList] = useState([]);

    const remove = msg => {
        setMsgList(oldMsgList => oldMsgList.filter(item => item.id !== msg.id))
    }

    add = msg => {
        const newMsg = { ...msg, id: uuid() }
        const duration = msg.duration || 2500
        setMsgList(oldMsgList => {
            // // 移除重复提示
            // oldMsgList.forEach(item => {
            // 	if (item.content === newMsg.content && item.type === newMsg.type) {
            // 		remove(item)
            // 	}
            // })
            return [...oldMsgList, newMsg]
        })
        setTimeout(() => {
            remove(newMsg)
        }, duration);
    }

    return (
        <ul id={style.message_wrapper}>
            {msgList.map(msg => (
                <Message key={msg.id} remove={remove} {...msg} />
            ))}
        </ul>
    )
}

const Message = React.memo(props => {
    const { type, content, remove } = props;
    const distinguishType = () => {
        switch (type) {
            case 'success':
                return {
                    messageIcon: <CheckCircleFilled />,
                    typeCls: style.success
                }
            case 'warning':
                return {
                    messageIcon:<ExclamationCircleFilled />,
                    typeCls: style.warning
                }
            case 'error':
                return {
                    messageIcon: <CloseCircleFilled />,
                    typeCls: style.error
                }
            default:
                return {
                    messageIcon: <InfoCircleFilled />,
                    typeCls: style.info
                }
        }
    }

	const { messageIcon, typeCls } = distinguishType()
	const messageCls = clsx(style.message, typeCls)
    return (
		<li className={messageCls} onClick={() => remove(props)}>
			{messageIcon}
			<span>{content}</span>
		</li>
	)
})

// MessageContainer append 到 #root 外，确保唯一且不会触发业务组件树渲染
{
	let elem = document.querySelector('#extra-container')
	if (!elem) {
		elem = document.createElement('div')
		elem.id = 'extra-container'
		document.body.append(elem)
	}
	ReactDOM.render(<MessageContainer />, elem)
}

const message = {
	info(content, duration) {
		add({ type: 'info', content, duration })
	},
	success(content, duration) {
		add({ type: 'success', content, duration })
	},
	warning(content, duration) {
		add({ type: 'warning', content, duration })
	},
	error(content, duration) {
		add({ type: 'error', content, duration })
	}
}
export default message
