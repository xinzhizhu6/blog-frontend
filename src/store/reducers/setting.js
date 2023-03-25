import { handleActions } from 'redux-actions'
import TYPE from '@/common/actionTypes'
import { stringToBoolean } from '@/utils'

const localuseMarkdownGuide = stringToBoolean(localStorage.getItem('useMarkdownGuide'))

export const setting = handleActions(
    {
        [TYPE.MERGE_SETTING]: (state, action) => ({ ...state, ...action.payload })
    },
    {
        theme: localStorage.getItem('theme') || 'primary',
        lang: localStorage.getItem('lang') || 'zh-CN',
		useMarkdownGuide: localuseMarkdownGuide != null ? localuseMarkdownGuide : true
    }
)