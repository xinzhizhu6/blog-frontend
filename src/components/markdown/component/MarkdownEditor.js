import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Popover } from 'antd'
import style from '../style/index.module.scss'
import * as temp from '../temp'
import * as fileApi from '@/apis/file'
import { useDispatch, useSelector } from 'react-redux'
import { msg, Upload } from '@/components/base'
import { useTranslation } from 'react-i18next'
import { useBoolean, useMediaQuery } from '@/utils/hooks'
import { TableOutlined, CodeOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined, CloseOutlined } from '@ant-design/icons'
import Editor from './Editor'
import Preview from './Preview'
import { followScroll, getPosition, insertTemp, setPosition } from '../util'

const area = {
    EDITOR: 'editor',
    PERVIEW: 'preview'
}

function MarkdownEditor() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userProfile.userId)
    const online = useSelector(state => state.online)
    const isMobile = useMediaQuery('(max-width:600px)')
    const useMarkdownGuide = useSelector(state => state.setting.useMarkdownGuide)

    const [previewing, { toggle: togglePreview, setTrue: bePreviewing }] = useBoolean(false)
    const [content, setContent] = useState('')
    const [tableInputVisible, setTableInputVisible] = useState(false)

    useEffect(() => {
        setContent(useMarkdownGuide ? temp.markdownDemo : "")
    }, [useMarkdownGuide])

    // 默认focus textarea
    useEffect(() => {
        editorRef.current.focus()
    }, [])

    const editorRef = useRef()
    const previewRef = useRef()

    let hoverArea = useRef(area.EDITOR).current

    const insert = (targetString, offset = 0) => {
        if (typeof targetString !== 'string') return

        setContent(oldContent => {
            const position = getPosition(editorRef.current)
            const targetPos = position.start + offset
            setPosition(editorRef.current, targetPos)
            return insertTemp(oldContent, position.start, targetString)
        })
    }

    const handleInsertTable = ({ row, column }) => {
        row = Number(row)
        column = Number(column)
        if (Number(row) < 2 || Number(row) > 100) {
            msg.error(t('article_publish.rule.row_limit'))
            return
        }
        if (Number(column) < 2 || Number(column) > 10) {
            msg.error(t('article_publish.rule.column_limit'))
            return
        }
        insert(temp.createTable(row, column), 4)
        setTableInputVisible(false)
    }

    const handleInsertCode = () => {
        insert(temp.codeBlock, 5)
    }

    const handleReset = () => {
        setContent('')
        editorRef.current.focus()
    }

    const handleFilesChange = (formData) => {
        //todo
        console.log(formData)
    }

    const tableInputElement = (
        <Form onFinish={handleInsertTable}>
            <div className={style.top_wrapper}>
                <Form.Item name="row" initialValue="3">
                    <Input className={style.input} placeholder={t('article_publish.row')} />
                </Form.Item>
                <CloseOutlined />
                <Form.Item name="column" initialValue="3" >
                    <Input className={style.input} placeholder={t('article_publish.column')} />
                </Form.Item>
            </div>
            <div className={style.bottom_wrapper}>
                <Button type="primary" htmlType="submit">
                    {t('article_publish.generate')}
                </Button>
            </div>
        </Form>
    )
    const toolsBarElement = (
        <div className={style.tools}>
            <Popover
                overlayClassName={style.table_input_wrapper}
                content={tableInputElement}
                trigger="click"
                placement="bottomLeft"
                visible={tableInputVisible}
                onVisibleChange={tableInputVisible => setTableInputVisible(tableInputVisible)}>
                <Button icon={<TableOutlined />} type='text' shape="circle"></Button>
            </Popover>
            <Upload multiple={false} onChange={handleFilesChange} />
            <Button icon={<CodeOutlined />} type='text' shape="circle" onClick={handleInsertCode}></Button>
            <Button icon={<DeleteOutlined />} type='text' shape="circle" onClick={handleReset}></Button>
        </div>
    )

    const operationElement = (
        <div className={style.operation}>
            {isMobile && (
                <Button onClick={togglePreview} icon={previewing ? <EyeOutlined /> : <EyeInvisibleOutlined />} type='text' shape="circle"></Button>
            )}
            {online ? (
                <Button className={style.publish} type="primary" >
                    {t('article_publish.to_publish')}
                </Button>
            ) : (
                <span>{t('article_publish.publish_prompt')}</span>
            )}
        </div>
    )

    const handleInput = event => {
        setContent(event.target.value)
    }

    const handleEnterEditor = () => {
        hoverArea = area.EDITOR
    }

    const handleEnterPreview = () => {
        hoverArea = area.PERVIEW
    }

    const handleLeave = () => {
        hoverArea = ""
    }

    const handleScrollEditor = () => {
        hoverArea === area.EDITOR && followScroll(editorRef.current, previewRef.current)
    }

    const handleScrollPreview = () => {
        hoverArea === area.PERVIEW && followScroll(previewRef.current, editorRef.current)
    }

    const editorProps = {
        content,
        handleInput,
        handleEnterEditor,
        handleLeave,
        handleScrollEditor
    }

    const previewProps = {
        content,
        handleEnterPreview,
        handleLeave,
        handleScrollPreview
    }

    const contentElement = (
        <section className={style.content}>
            {isMobile ? (
                previewing ? (
                    <Preview ref={previewRef} {...previewProps} />
                ) : (
                    <Editor ref={editorRef} {...editorProps} />
                )
            ) : (
                <>
                    <Editor ref={editorRef} {...editorProps} />
                    <Preview ref={previewRef} {...previewProps} />
                </>
            )
            }
        </section >
    )
    return (
        <div className={style.markdown_editor}>
            <div className={style.header_bar}>
                {toolsBarElement}
                {operationElement}
            </div>
            {contentElement}
        </div>
    )
}
export default MarkdownEditor
