import React from 'react'
import style from '../style/index.module.scss'
import Markdown from './Markdown'

function Preview(props, ref) {
    return (
        <article
            className={style.preview}
            ref={ref}
            onMouseEnter={props.handleEnterPreview}
			onMouseLeave={props.handleLeave}
            onScroll={props.handleScrollPreview}
        >
            <Markdown>{props.content}</Markdown>
        </article>
    )
}

export default React.memo(React.forwardRef(Preview))
