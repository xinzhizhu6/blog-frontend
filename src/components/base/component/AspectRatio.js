import React from "react"
import style from '../style/index.module.scss'

export default function AspectRatio(props) {
    const { aspectRatio, children } = props
    const paddingBottom = { paddingBottom: `calc(${aspectRatio * 100}%)` }
    return (
        <div className={style.aspectRatio} style={ paddingBottom }>
            <div className={style.aspectRatio_warp}>
                {children}
            </div>
        </div>
    )
}