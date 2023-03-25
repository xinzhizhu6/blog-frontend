import { handleActions } from 'redux-actions'
import TYPE from '@/common/actionTypes'

// 侧边抽屉打开状态
export const drawerOpened = handleActions(
    {
        [TYPE.UPDATE_DRAWER]: (state, action) => action.payload
    },
    false
)