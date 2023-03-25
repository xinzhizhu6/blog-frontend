import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import style from '../style/index.module.scss'
import { updateModal } from "@/store/actions";
import { Modal } from "antd";

export default function ModalContent(props) {
    const dispatch = useDispatch()
    const { visible, content } = useSelector(state => (state.modal))

    const handleClose = () => {
        dispatch(updateModal(false, null))
    }

    const modalStyle = {
        "minWidth": "32rem",
        "maxWidth": "40rem",
        "width": "38rem"
    }

    return (
        // visible && (
        //     <>
        //         <div className={style.modal_wrapper}>
        //             <div className={style.content}>
        //                 {content}
        //             </div>
        //         </div>
        //     </>
        // )
        <Modal open={visible} style={modalStyle} footer={null} closable={false}>
            <div className={style.content}>
                {content}
            </div>
        </Modal>
    )

}