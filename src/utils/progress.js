import config from '@/config'
import { updateTopProgress } from '@/store/actions'
import store from '@/store'

const { dispatch } = store

export const startFetch = () => {
	dispatch(updateTopProgress(12))
    setTimeout(() => {
		dispatch(updateTopProgress(66))
	}, config.PROGRESS_DELAY)
}

export const stopFetch = () => dispatch(updateTopProgress(0))


export const completeFetch = () => {
	// 为什么不是 100？因为宽度拉满时和 webkit backgrop-filter样式有冲突
	dispatch(updateTopProgress(99.9))
	setTimeout(() => {
		dispatch(updateTopProgress(0))
	}, config.PROGRESS_DELAY)
}
