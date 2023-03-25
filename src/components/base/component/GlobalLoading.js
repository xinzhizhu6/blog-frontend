import React from "react";
import style from '../style/index.module.scss'
import { Spin } from 'antd';

function GlobalLoading(props) {
    return (
		<section className={style.global_loading}>
			<Spin size="large"  {...props}/>
		</section>
	)
}

export default GlobalLoading