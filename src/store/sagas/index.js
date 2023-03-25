import { all, spawn } from 'redux-saga/effects'
import siderSaga from './sider'
import setting from './setting'
import modal from './modal'
import common from './common'

export default function* rootSaga() {
    yield all([spawn(siderSaga), spawn(setting), spawn(modal), spawn(common)])
}