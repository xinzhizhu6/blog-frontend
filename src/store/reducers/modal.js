import { handleActions } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const visible = handleActions(
    {
        [TYPE.UPDATE_MODAL_VISIBLE]: (state, action) => action.payload
    },
    false
)

export const content = handleActions(
    {
        [TYPE.UPDATE_MODAL_CONTENT]: (state, action) => action.payload
    },
    null
)
