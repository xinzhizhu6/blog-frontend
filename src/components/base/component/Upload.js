import { FileImageOutlined, ReadFilled } from "@ant-design/icons"
import { Button } from "antd"
import React, { useRef } from "react"
import style from '../style/index.module.scss'
import { readFile } from "../util"

const dataFormat = {
    BASE_64: 'base64',
    FORM_DATA: 'formdata'
}

/**
 * 文件上传
 * 内置支持 formdata 和 base64 两种格式
 * @param {{
 *	children: JSX.Element,
 *	format: 'base64 | formdata',
 *	onChange: (result: any) => void
 * }} props
 * @returns
 */

function InternalUploader(props) {
    const {
        children = (
            <Button type='text' shape="circle" icon={<FileImageOutlined />}></Button>
        ),
        format = dataFormat.FORM_DATA,
        onChange,
        ...rest
    } = props

    const fileInputRef = useRef()

    const handleSelect = () => {
        fileInputRef.current.click()
    }

    const handleChange = (event) => {
        const files = event.target.files
        if (format === dataFormat.BASE_64) {
            const fileList = Array.prototype.map.call(files, readFile)
            Promise.all(fileList).then(results => {
                onChange && onChange(results)
            })
        }else {
            const formData = new FormData()
            Array.prototype.forEach.call(files, file => {
                formData.append('image', file)
            })

            if(formData.get('image') && onChange) onChange(formData)
        }
    }

    return (
        <div className={style.uploader}>
            {React.cloneElement(children, { onClick: handleSelect })}
            <input ref={fileInputRef} type="file" multiple={false} accept="image/*" {...rest} onChange={handleChange} />
        </div>
    )

}

const Upload = React.memo(InternalUploader)
export default Upload