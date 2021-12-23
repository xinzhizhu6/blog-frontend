import React from "react";
import { Link } from "react-router-dom";
import style from "../style/index.module.scss"
import { msg } from "@/components/base";

function Branch(props) {
    const { to = '', name = 'BLOG' } = props
    const handleClickBranch = () => {
    }
    return (
        <Link className={style.branch} to={to} onClick={handleClickBranch}>
            <span>{name}</span>
        </Link>
    )
}

export default React.memo(Branch)