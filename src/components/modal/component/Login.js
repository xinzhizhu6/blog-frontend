import React, { useState } from 'react'
import style from '../style/index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { updateModal, userLogin } from '@/store/actions'
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import { msg } from '@/components/base'
import config from '@/config'
import { useFetch } from '@/utils/hooks'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { CloseOutlined } from '@ant-design/icons'
import * as userApi from '@/apis/user'

export default function Login() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const theme = useSelector(state => state.setting.theme)
    const [avatar, setAvatar] = useState(defaultAvatar)

    const handleClose = () => {
        dispatch(updateModal(false, null))
    }

    const { loading, run: fetchAvatar } = useFetch(userApi.fetchProfile, {
        initialData: {},
        manual: true,
        loadingDelay: config.LOADING_DELAY,
        onSuccess(res) {
            if (res?.avatar) {
                setAvatar(res.avatar)
            }
        },
        onError(err) {
            if (err) {
                setAvatar(defaultAvatar)
            }
        }
    })

    const handleSubmit = values => {
        console.log(values)
        const { username, password } = values
        if (!username || !password) {
            msg.error(t('modal.login.rule.complete_account'))
            return
        }
        dispatch(userLogin({ username, password }))
    }

    const handleGoRegister = () => {

    }

    const formElement = (
        <Form onFinish={handleSubmit}>
            <Form.Item
                name="username"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const pattern = new RegExp('^[^\u4e00-\u9fa5]+$', 'i')
                            if (!value) {
                                return Promise.reject(t('modal.login.rule.username_not_empty'))
                            }
                            else if (!pattern.test(value)) {
                                return Promise.reject(t('modal.login.rule.not_zh'))
                            }
                            else {
                                fetchAvatar(value)
                                return Promise.resolve();
                            }
                        },
                    }),
                ]}
            >
                <Input placeholder={t('modal.login.username')} />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            const pattern = new RegExp('^(?=.*?[a-z])(?=.*?[0-9]).*$', 'i')
                            if (value.length < 6) {
                                return Promise.reject(t('modal.login.rule.password_length_limit'))
                            }
                            else if (!pattern.test(value)) {
                                return Promise.reject(t('modal.login.rule.number_and_alphabet'))
                            }
                            else {
                                return Promise.resolve();
                            }
                        },
                    })
                ]}
            >
                <Input type="password" placeholder={t('modal.login.password')} />
            </Form.Item>
            <Button className={style.submit} type="primary" htmlType="submit" >
                {t('modal.login.login')}
            </Button>
            <div className={style[`go_register_${theme}`]} onClick={handleGoRegister}>
                {t('modal.login.have_not_account')}
            </div>
        </Form>
    )

    return (
        <div className={style.login_wrapper}>
            <h1>{t('modal.login.heading')}</h1>
            <Button className={style.close} type="text" icon={<CloseOutlined />} onClick={handleClose}>

            </Button>
            <div className={style.avatar_wrapper}>
                <img src={avatar} alt="" />
            </div>
            {formElement}
        </div>
    )
}