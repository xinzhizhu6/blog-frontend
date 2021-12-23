import axios from 'axios'
import i18n from '@/common/i18n'
import config from '@/config'
import { msg } from '@/components/base'
import { completeFetch, startFetch, stopFetch } from './progress'


const getNetError = () => i18n.t('error.network_connection_failed')

const instance = axios.create({
    baseURL: config.BASE_URL,
    method: "GET",
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*'
    },
	withCredentials: true
})

instance.interceptors.request.use(
    req => {
        startFetch()
		return req
    },
    err => Promise.reject("Request rejected", err)
)

instance.interceptors.response.use(
    res => {
		completeFetch()

        if (res.status !== 200) {
			msg.error(`${getNetError()}:${res.status}`)
			return Promise.reject(res)
		}
		if (res.data.message !== 'ok') {
			return Promise.reject(res.data.message)
		}
		return Promise.resolve(res.data.payload)
    },
    err => {
		stopFetch()
        if (!err.response) {
			msg.error(getNetError())
			return Promise.reject(getNetError())
		}
		if (err.response.status === 401) {
			msg.info(i18n.t('info.not_login'))
			return Promise.reject(err)
		}
		if (err.response.status === 500) {
			msg.error(i18n.t('error.server_internal_error'))
			return Promise.reject(err)
		}
		msg.error(getNetError())
		return Promise.reject(err)
    }
)

export default instance
