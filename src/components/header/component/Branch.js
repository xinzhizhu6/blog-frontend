import React from "react";
import { Link } from "react-router-dom";
import style from "../style/index.module.scss"
import { msg } from "@/components/base";
import { useSelector } from "react-redux";

function Branch(props) {
    const { to = '', name = 'BLOG' } = props
    const theme = useSelector(state => state.setting.theme)

    const handleClickBranch = () => {
    }
    return (
        <Link className={style[`branch_${theme}`]} to={to} onClick={handleClickBranch}>
            <span>{name}</span>
        </Link>
    )
}

export default React.memo(Branch)