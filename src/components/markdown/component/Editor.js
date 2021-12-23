import React from "react"
import style from '../style/index.module.scss'
import { useTranslation } from 'react-i18next'

/**
 * 文本编辑器
 * @param {{
 * 	content: string,
 * 	setContent: (value: React.SetStateAction<string>) => void,
 * 	handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
 * 	handleEnterEditor: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void,
 * 	handleLeave: (event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void,
 * 	handleScrollEditor: (event: React.UIEvent<HTMLTextAreaElement, UIEvent>) => void,
 * }} props
 * @param {React.MutableRefObject<any>} ref
 * @returns
 */
function Editor(props, ref) {
    const { content ,handleInput, handleEnterEditor, handleLeave, handleScrollEditor} = props
    const { t } = useTranslation()
    return (
        <article className={style.editor}>
            <textarea
				ref={ref}
                value={content}
                onChange={handleInput}
                onMouseEnter={handleEnterEditor}
                onMouseLeave={handleLeave}
                onScroll={handleScrollEditor}
                placeholder={t('markdown.placeholder')}
            >
            </textarea>
        </article>
    )
}

export default React.forwardRef(Editor)