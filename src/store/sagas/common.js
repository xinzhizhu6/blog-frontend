import { all, spawn, put, takeEvery, select } from 'redux-saga/effects'
import TYPE from '@/common/actionTypes'
import * as userApi from '@/apis/user'
import omit from 'omit.js'
import { updateUserProfile, mergeSetting, updateOnline, updateModal } from '../actions'
import { stringToBoolean } from '@/utils'
import i18n from '@/common/i18n'
import { msg } from '@/components/base'

function* fetchUserInfo() {
    try {
        const payload = yield userApi.initialData()
        const profile = omit(payload, ['setting'])
        console.log(payload, profile)
        yield put(updateUserProfile(profile))
        yield put(mergeSetting(payload.setting))
        yield put(updateOnline(true))
    } catch (err) {
        console.error('初始化用户信息', err)
        const theme = localStorage.getItem('theme')
        const lang = localStorage.getItem('lang')
        const useMarkdownGuide = stringToBoolean(localStorage.getItem('useMarkdownGuide'))
        if (theme != null) put(mergeSetting({ theme }))
        if (lang != null) put(mergeSetting({ lang }))
        if (useMarkdownGuide != null) put(mergeSetting({ useMarkdownGuide }))
    }
}

function* initUser() {
    yield fetchUserInfo()
}

function* login({ username, password }) {
    try {
        yield userApi.login(username, password)
        yield fetchUserInfo()
        yield put(updateModal(false, null))
        msg.success(i18n.t('success.login'))
    } catch (err) {
        console.error(i18n.t('error.login'), err)
        msg.error(`${i18n.t('error.login')} ${err}`)
    }
}

function* logout() {
    console.log(1)
    try {
        yield userApi.logout()
        yield put(updateOnline(false))
        yield put(updateUserProfile({}))
        yield put(mergeSetting({
            // due to browser language detected, don't reset it.
            theme: 'primary',
            useMarkdownGuide: true
        }))
        msg.success(i18n.t('success.logout'))
    } catch (err) {
        console.error(i18n.t('error.logout'), err)
        msg.error(i18n.t('error.logout'))
    }
}

function* saveProfile(profile) {
    const oldProfile = yield select(state => state.userProfile)
    const newProfile = { ...oldProfile, ...profile }
    delete newProfile.password;
    try {
        yield userApi.saveProfile(newProfile)
        yield put(updateUserProfile(newProfile))
        msg.success(i18n.t('success.save'))
    } catch (err) {
        console.error(i18n.t('error.save'), err)
        msg.error(i18n.t('error.save'))
    }
}

function* initUserSaga() {
    yield takeEvery(TYPE.INIT_USER, action => initUser(action.payload))
}

function* loginSaga() {
    yield takeEvery(TYPE.USER_LOGIN, action => login(action.payload))
}

function* logoutSaga() {
    yield takeEvery(TYPE.USER_LOGOUT, action => logout(action.payload))
}

function* saveProfileSaga() {
    yield takeEvery(TYPE.SAVE_PROILE, action => saveProfile(action.payload))
}


export default function* commonSaga() {
    yield all([spawn(initUserSaga), spawn(loginSaga), spawn(logoutSaga), spawn(saveProfileSaga)])
}
