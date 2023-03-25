import { createAction } from 'redux-actions'
import TYPE from '@/common/actionTypes'

export const initUser = createAction(TYPE.INIT_USER)

export const userLogin = createAction(TYPE.USER_LOGIN)

export const userLogout = createAction(TYPE.USER_LOGOUT)

export const userRegister = createAction(TYPE.USER_REGISTER)

export const updateOnline = createAction(TYPE.UPDATE_ONLINE)

export const updateUserProfile = createAction(TYPE.UPDATE_USER_PROFILE)

export const saveProfile = createAction(TYPE.SAVE_PROILE)

export const updateTopProgress = createAction(TYPE.UPDATE_TOP_PROGRESS)

/** sider */
export const toggleDrawer = createAction(TYPE.TOGGLE_DRAWER)

export const updateDrawer = createAction(TYPE.UPDATE_DRAWER)

/** article */
export const updateArticleDetail = createAction(TYPE.UPDATE_ARTICLE_DETAIL)

export const updateArticleAuthorProfile = createAction(TYPE.UPDATE_ARTICLE_AUTHOR_PROFILE)

export const increaseArticleViews = createAction(TYPE.INCREASE_ARTICLE_VIEWS)

/** setting */
export const mergeSetting = createAction(TYPE.MERGE_SETTING)

export const saveSetting = createAction(TYPE.SAVE_SETTING)


/** modal */
export const updateModalVisible = createAction(TYPE.UPDATE_MODAL_VISIBLE)

export const updateModalContent = createAction(TYPE.UPDATE_MODAL_CONTENT)

export const updateModal = createAction(TYPE.UPDATE_MODAL, (visible, content) => ({ visible, content }))