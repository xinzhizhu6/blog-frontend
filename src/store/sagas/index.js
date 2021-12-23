import { all, spawn } from 'redux-saga/effects'
import siderSaga from './sider'
import setting from './setting'

export default function* rootSaga() {
    yield all([spawn(siderSaga), spawn(setting)])
}