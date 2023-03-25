import React from 'react'
import { Link } from 'react-router-dom'
import style from '../style/index.module.scss'
import { AspectRatio } from '@/components/base'
import { useSelector } from 'react-redux'
/**
 * 文章卡片。用于展示文章标题、背景缩略图、作者信息，并跳转到对应页面。
 * @param {{
 * 	id: number,
 * 	author: string,
 * 	category: 'frontend | backend | mobile | computer_science | engineering',
 * 	title: string,
 * 	backgroundImage: string
 * }} props
 * @returns {JSX.Element}
 */
export default function ArticleCard(props) {
    const { id, author, category, title, backgroundImage } = props
    const theme = useSelector(state => state.setting.theme)

    const aritcleLink = `/article/${category}/detail/${id}`
    const authorLink = `/user/${1}`

    return (
        <div className={style.article_card_wrapper}>
            <div className={style[`article_card_${theme}`]}>
                <AspectRatio aspectRatio={4 / 3}>
                    <Link to={aritcleLink}>
                        <div className={style.cover}>
                            <img src={backgroundImage} alt="" />
                        </div>
                    </Link>
                    <div className={style.bottom}>
                        <Link className={style.title} to={aritcleLink}>
                            <h3>{title}</h3>
                        </Link>
                        <Link className={style.author} to={authorLink}>
                            {author}
                        </Link>
                    </div>
                </AspectRatio>
            </div>
        </div>
    )
}