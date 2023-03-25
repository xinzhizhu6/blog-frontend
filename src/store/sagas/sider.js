import { all, spawn, put, takeEvery, select } from 'redux-saga/effects'
import TYPE from '@/common/actionTypes'

function* toggleDrawer() {
    const { drawerOpened } = yield select()
    yield put({type: 'UPDATE_DRAWER' , payload: !drawerOpened})
}

// ------------------------------saga---------------watch----------------------------------------
function* toggleDrawerSaga() {
	yield takeEvery(TYPE.TOGGLE_DRAWER, action => toggleDrawer())
}

export default function* siderSaga() {
	yield all([spawn(toggleDrawerSaga)])
}
